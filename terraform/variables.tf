# variables file

variable "project" { default = "qwiklabs-gcp-01-ec162502d964" }

variable "credentials_file" { default = "/home/enrico/.config/gcloud/application_default_credentials.json"}

variable "region" {
  default = "europe-west1"
}

variable "zone" {
  default = "us-central1-c"
}
