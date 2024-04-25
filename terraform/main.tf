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
## cloudbuild.googleapis.com

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

resource "google_project_service" "cloudbuild_api"{
  project = var.project
  service = "cloudbuild.googleapis.com"

}

# Prepare the data on Cloud Storage
resource "google_storage_bucket" "bucket" {
  # name should be "vertex-ai-vector-search"  and project id appended
  name = "vertex-ai-vector-search-${var.project}"
  location = var.region
}


# Cloud function to handle llm-service
resource "google_cloudfunctions_function" "llm_service" {
  name                  = "llm-service"
  description           = "llm-service"
  available_memory_mb   = 256
  source_archive_bucket = "uploads-1084982549993.europe-west1.cloudfunctions.appspot.com"
  source_archive_object = "46dc8dfb-9d59-48ea-af68-dad913077947.zip"
  timeout               = 60
  entry_point           = "listen"
  runtime               = "python311"
  ingress_settings      = "ALLOW_ALL"
  max_instances         = 1

  environment_variables = {
    _BUCKET_URI = "gs://$vertex-ai-vector-search-${var.project}"
  }

  service_account_email = "qwiklabs-gcp-01-ec162502d964@appspot.gserviceaccount.com"

  labels = {
    deployment-tool = "console-cloud"
  }

  trigger_http = true
}