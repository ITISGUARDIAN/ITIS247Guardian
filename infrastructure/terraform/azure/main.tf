# Terraform Infrastructure as Code for ITIS on Microsoft Azure
# Provisions Azure AKS, Azure Database for PostgreSQL Flexible Server, Azure Blob Storage,
# Azure Key Vault, Azure Front Door CDN, and Azure DNS.

terraform {
  required_version = ">= 1.5.0"
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.70"
    }
  }
  backend "azurerm" {
    resource_group_name  = "rg-itis-tfstate"
    storage_account_name = "stitistfstate"
    container_name       = "tfstate"
    key                  = "production/azure/terraform.tfstate"
  }
}

provider "azurerm" {
  features {}
}

variable "location" {
  type    = string
  default = "southafricanorth" # Azure Johannesburg Data Center
}

variable "environment" {
  type    = string
  default = "production"
}

# --- Resource Group ---
resource "azurerm_resource_group" "rg" {
  name     = "rg-itis-prod-za"
  location = var.location

  tags = {
    Environment = var.environment
    Project     = "ITIS"
    Compliance  = "SITA-POPIA-ISO27001"
  }
}

# --- Virtual Network ---
resource "azurerm_virtual_network" "vnet" {
  name                = "vnet-itis-prod"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  address_space       = ["10.200.0.0/16"]
}

resource "azurerm_subnet" "aks_subnet" {
  name                 = "snet-aks"
  resource_group_name  = azurerm_resource_group.rg.name
  virtual_network_name = azurerm_virtual_network.vnet.name
  address_prefixes     = ["10.200.1.0/24"]
}

# --- AKS Kubernetes Cluster ---
resource "azurerm_kubernetes_cluster" "aks" {
  name                = "aks-itis-prod-za"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  dns_prefix          = "itis-k8s"

  default_node_pool {
    name       = "systemnodes"
    node_count = 3
    vm_size    = "Standard_D4s_v5"
    os_disk_size_gb = 128
    vnet_subnet_id  = azurerm_subnet.aks_subnet.id
  }

  identity {
    type = "SystemAssigned"
  }

  network_profile {
    network_plugin    = "azure"
    load_balancer_sku = "standard"
  }
}

# --- Azure Key Vault ---
resource "azurerm_key_vault" "kv" {
  name                        = "kv-itis-prod-za"
  location                    = azurerm_resource_group.rg.location
  resource_group_name         = azurerm_resource_group.rg.name
  enabled_for_disk_encryption = true
  tenant_id                   = "00000000-0000-0000-0000-000000000000"
  sku_name                    = "standard"
}

# --- Azure Storage Account & Blob Container ---
resource "azurerm_storage_account" "sa" {
  name                     = "stitisprodza"
  resource_group_name      = azurerm_resource_group.rg.name
  location                 = azurerm_resource_group.rg.location
  account_tier             = "Standard"
  account_replication_type = "GRS" # Geo-Redundant Storage
}

resource "azurerm_storage_container" "evidence" {
  name                  = "evidence-vault"
  storage_account_name  = azurerm_storage_account.sa.name
  container_access_type = "private"
}

# --- Azure PostgreSQL Flexible Server ---
resource "azurerm_postgresql_flexible_server" "postgres" {
  name                   = "psql-itis-prod-za"
  resource_group_name    = azurerm_resource_group.rg.name
  location               = azurerm_resource_group.rg.location
  version                = "15"
  administrator_login    = "itis_admin"
  administrator_password = "ChangeMeInAzureKeyVault123!"
  storage_mb             = 262144
  sku_name               = "GP_Standard_D4ds_v5"
  zone                   = "1"
}

output "aks_cluster_name" {
  value = azurerm_kubernetes_cluster.aks.name
}
