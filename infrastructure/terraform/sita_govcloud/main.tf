# Terraform Infrastructure as Code for SITA eGov Sovereign Cloud (South Africa)
# Compatible with SITA GovCloud / Teraco Cape Town & Johannesburg / OpenStack
# Enforces strictly local South African Data Sovereignty, POPIA Compliance, & SITA Security Standards.

terraform {
  required_version = ">= 1.5.0"
  required_providers {
    openstack = {
      source  = "terraform-provider-openstack/openstack"
      version = "~> 1.52"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.23"
    }
  }
}

provider "openstack" {
  auth_url    = var.sita_auth_url
  tenant_name = "SITA-ITIS-SOVEREIGN-PROJECT"
  user_name   = var.sita_username
  password    = var.sita_password
  region      = "ZA-GCLOUD-JHB-1" # Johannesburg Primary Data Center
}

variable "sita_auth_url" {
  type    = string
  default = "https://identity.govcloud.sita.co.za/v3"
}

variable "sita_username" {
  type    = string
  default = "itis-govcloud-admin"
}

variable "sita_password" {
  type      = string
  sensitive = true
  default   = "ChangeInVaultSitaPassword2026!"
}

# --- Network & Security Group ---
resource "openstack_networking_network_v2" "sita_network" {
  name           = "sita-itis-private-net"
  admin_state_up = "true"
}

resource "openstack_networking_subnet_v2" "sita_subnet" {
  name       = "sita-itis-subnet-primary"
  network_id = openstack_networking_network_v2.sita_network.id
  cidr       = "10.250.0.0/16"
  ip_version = 4
}

resource "openstack_compute_secgroup_v2" "secgroup" {
  name        = "sita-itis-secgroup"
  description = "Strict SITA eGov Perimeter Security Group"

  rule {
    from_port   = 443
    to_port     = 443
    ip_protocol = "tcp"
    cidr        = "0.0.0.0/0"
  }

  rule {
    from_port   = 6443
    to_port     = 6443
    ip_protocol = "tcp"
    cidr        = "10.250.0.0/16" # K8s API internal access only
  }
}

# --- SITA Sovereign OpenStack Instances for K8s Control Plane & Workers ---
resource "openstack_compute_instance_v2" "k8s_master" {
  count           = 3
  name            = "sita-k8s-master-0${count.index + 1}"
  image_name      = "Ubuntu-22.04-LTS-SITA-Hardened"
  flavor_name     = "sita.xlarge.8vcpu.32gb"
  key_pair        = "sita-pki-keypair"
  security_groups = [openstack_compute_secgroup_v2.secgroup.name]

  network {
    uuid = openstack_networking_network_v2.sita_network.id
  }
}

resource "openstack_compute_instance_v2" "k8s_worker" {
  count           = 5
  name            = "sita-k8s-worker-0${count.index + 1}"
  image_name      = "Ubuntu-22.04-LTS-SITA-Hardened"
  flavor_name     = "sita.2xlarge.16vcpu.64gb"
  key_pair        = "sita-pki-keypair"
  security_groups = [openstack_compute_secgroup_v2.secgroup.name]

  network {
    uuid = openstack_networking_network_v2.sita_network.id
  }
}

# --- Sovereign Object Storage Container (S3 Compatible) ---
resource "openstack_objectstorage_container_v1" "evidence_vault" {
  name = "sita-itis-evidence-sovereign-vault"
  metadata = {
    "POPIA-Data-Classification" = "CONFIDENTIAL_GOVERNMENT_RECORD"
    "Data-Residency"            = "SOUTH_AFRICA_ONLY"
  }
}

output "sita_master_ips" {
  value = openstack_compute_instance_v2.k8s_master[*].access_ip_v4
}
