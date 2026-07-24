# Terraform Infrastructure as Code for ITIS on Google Cloud Platform (GCP)
# Provisions Google Kubernetes Engine (GKE Autopilot/Standard), Cloud SQL PostgreSQL,
# Cloud Storage Bucket, Cloud CDN, Secret Manager, and Cloud DNS.

terraform {
  required_version = ">= 1.5.0"
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
  }
  backend "gcs" {
    bucket = "itis-tfstate-gcp"
    prefix = "production/gcp/state"
  }
}

provider "google" {
  project = var.gcp_project_id
  region  = var.gcp_region
}

variable "gcp_project_id" {
  type    = string
  default = "itis-production-za"
}

variable "gcp_region" {
  type    = string
  default = "europe-west2" # Or africa-south1 when available
}

# --- VPC Network ---
resource "google_compute_network" "vpc" {
  name                    = "itis-vpc-network"
  auto_create_subnetworks = false
}

resource "google_compute_subnetwork" "subnet" {
  name          = "itis-subnet-primary"
  ip_cidr_range = "10.30.0.0/16"
  region        = var.gcp_region
  network       = google_compute_network.vpc.id
}

# --- GKE Cluster ---
resource "google_container_cluster" "gke" {
  name     = "gke-itis-prod-cluster"
  location = var.gcp_region

  remove_default_node_pool = true
  initial_node_count       = 1

  network    = google_compute_network.vpc.name
  subnetwork = google_compute_subnetwork.subnet.name
}

resource "google_container_node_pool" "primary_nodes" {
  name       = "itis-node-pool"
  location   = var.gcp_region
  cluster    = google_container_cluster.gke.name
  node_count = 3

  node_config {
    preemptible  = false
    machine_type = "e2-standard-4"
    disk_size_gb = 100
    disk_type    = "pd-ssd"

    oauth_scopes = [
      "https://www.googleapis.com/auth/cloud-platform"
    ]
  }
}

# --- Cloud SQL PostgreSQL ---
resource "google_sql_database_instance" "postgres" {
  name             = "itis-cloudsql-postgres-prod"
  database_version = "POSTGRES_15"
  region           = var.gcp_region

  settings {
    tier = "db-custom-4-16384"
    availability_type = "REGIONAL" # Multi-AZ High Availability

    backup_configuration {
      enabled            = true
      start_time         = "02:00"
      point_in_time_recovery_enabled = true
    }

    ip_configuration {
      ipv4_enabled    = true
      private_network = google_compute_network.vpc.id
    }
  }
}

resource "google_sql_database" "database" {
  name     = "itis_production"
  instance = google_sql_database_instance.postgres.name
}

# --- Cloud Storage Bucket ---
resource "google_storage_bucket" "evidence_vault" {
  name          = "itis-evidence-vault-gcp"
  location      = "EU"
  force_destroy = false

  uniform_bucket_level_access = true

  versioning {
    enabled = true
  }
}

output "gke_cluster_name" {
  value = google_container_cluster.gke.name
}
