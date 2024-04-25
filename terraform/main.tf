# terraform main to prepare vertex ai vector search
# based on https://cloud.google.com/vertex-ai/docs/vector-search/quickstart

terraform {
  required_providers {
    google = {
      source = "hashicorp/google"
      version = "4.51.0"
    }
  }
}

provider "google" {
  project = var.project
  region  = var.region
}

# enable the required APIs
## storage.googleapis.com
## compute.googleapis.com 
## aiplatform.googleapis.com 

resource "google_project_service" "compute_api" {
  project = var.project
  service = "compute.googleapis.com"
}

resource "google_project_service" "aiplatform_api" {
  project = var.project
  service = "aiplatform.googleapis.com"
}

resource "google_project_service" "storage_api" {
  project = var.project
  service = "storage.googleapis.com"
}


# Prepare the data on Cloud Storage
resource "google_storage_bucket" "bucket" {
  # name should be "vertex-ai-vector-search"  and project id appended
  name = "vertex-ai-vector-search-${var.project}"
  location = var.region
}
