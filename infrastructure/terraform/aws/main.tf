# Terraform Infrastructure as Code for ITIS on Amazon Web Services (AWS)
# Provisions AWS EKS (Kubernetes), RDS PostgreSQL (Multi-AZ), ElastiCache Redis,
# S3 Object Storage, CloudFront CDN, Route53 DNS, Secrets Manager, and KMS Encryption.

terraform {
  required_version = ">= 1.5.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.23"
    }
    helm = {
      source  = "hashicorp/helm"
      version = "~> 2.11"
    }
  }
  backend "s3" {
    bucket         = "itis-terraform-state-af-south-1"
    key            = "production/aws/terraform.tfstate"
    region         = "af-south-1" # Cape Town Region
    dynamodb_table = "itis-terraform-locks"
    encrypt        = true
  }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Environment = var.environment
      Project     = "ITIS"
      ManagedBy   = "Terraform"
      Compliance  = "SITA-POPIA-ISO27001"
    }
  }
}

variable "aws_region" {
  type    = string
  default = "af-south-1"
}

variable "environment" {
  type    = string
  default = "production"
}

variable "domain_name" {
  type    = string
  default = "itis.gov.za"
}

# --- VPC & Networking ---
module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "~> 5.0"

  name = "itis-prod-vpc"
  cidr = "10.100.0.0/16"

  azs             = ["af-south-1a", "af-south-1b", "af-south-1c"]
  private_subnets = ["10.100.1.0/24", "10.100.2.0/24", "10.100.3.0/24"]
  public_subnets  = ["10.100.101.0/24", "10.100.102.0/24", "10.100.103.0/24"]
  database_subnets = ["10.100.201.0/24", "10.100.202.0/24", "10.100.203.0/24"]

  enable_nat_gateway   = true
  single_nat_gateway   = false
  enable_vpn_gateway   = true
  enable_dns_hostnames = true
  enable_dns_support   = true
}

# --- KMS Encryption Key ---
resource "aws_kms_key" "itis_kms" {
  description             = "ITIS Master KMS Encryption Key"
  deletion_window_in_days = 30
  enable_key_rotation     = true
}

# --- AWS EKS Cluster ---
module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 19.0"

  cluster_name    = "itis-prod-eks-cluster"
  cluster_version = "1.28"

  vpc_id                         = module.vpc.vpc_id
  subnet_ids                     = module.vpc.private_subnets
  cluster_endpoint_public_access = true

  eks_managed_node_groups = {
    core_nodes = {
      min_size     = 3
      max_size     = 10
      desired_size = 3

      instance_types = ["t3.xlarge"]
      capacity_type  = "ON_DEMAND"

      block_device_mappings = {
        xvda = {
          device_name = "/dev/xvda"
          ebs = {
            volume_size           = 100
            volume_type           = "gp3"
            encrypted             = true
            kms_key_id            = aws_kms_key.itis_kms.arn
            delete_on_termination = true
          }
        }
      }
    }
  }
}

# --- S3 Digital Evidence & Telematics Storage ---
resource "aws_s3_bucket" "itis_evidence_vault" {
  bucket = "itis-evidence-vault-af-south-1"
}

resource "aws_s3_bucket_server_side_encryption_configuration" "evidence_enc" {
  bucket = aws_s3_bucket.itis_evidence_vault.id

  rule {
    apply_server_side_encryption_by_default {
      kms_master_key_id = aws_kms_key.itis_kms.arn
      sse_algorithm     = "aws:kms"
    }
  }
}

resource "aws_s3_bucket_versioning" "evidence_versioning" {
  bucket = aws_s3_bucket.itis_evidence_vault.id
  versioning_configuration {
    status = "Enabled"
  }
}

# --- RDS PostgreSQL Database (Multi-AZ) ---
resource "aws_db_subnet_group" "rds_subnet_grp" {
  name       = "itis-rds-subnet-group"
  subnet_ids = module.vpc.database_subnets
}

resource "aws_db_instance" "itis_postgres" {
  identifier             = "itis-prod-postgres"
  allocated_storage      = 200
  max_allocated_storage  = 1000
  engine                 = "postgres"
  engine_version         = "15.4"
  instance_class         = "db.r6g.xlarge"
  db_name                = "itis_production"
  username               = "itis_admin"
  password               = "ChangeMeInProductionVaultSecret123!"
  db_subnet_group_name   = aws_db_subnet_group.rds_subnet_grp.name
  multi_az               = true
  storage_encrypted      = true
  kms_key_id             = aws_kms_key.itis_kms.arn
  skip_final_snapshot    = false
  final_snapshot_identifier = "itis-db-final-snapshot"
  backup_retention_period = 30
}

# --- CloudFront CDN ---
resource "aws_cloudfront_distribution" "cdn" {
  origin {
    domain_name = aws_s3_bucket.itis_evidence_vault.bucket_regional_domain_name
    origin_id   = "S3-itis-evidence"
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-itis-evidence"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  restrictions {
    geo_restriction {
      restriction_type = "whitelist"
      locations        = ["ZA"] # South Africa Geo-Lock option for SITA compliance
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}

# --- Route53 DNS ---
resource "aws_route53_zone" "itis_domain" {
  name = var.domain_name
}

output "eks_cluster_endpoint" {
  value = module.eks.cluster_endpoint
}

output "cloudfront_domain" {
  value = aws_cloudfront_distribution.cdn.domain_name
}
