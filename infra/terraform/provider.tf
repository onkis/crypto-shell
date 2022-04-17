# provider.tf

# Specify the provider and access details
provider "aws" {
  shared_credentials_files = ["$HOME/.aws/creds"]
  profile                 = "default"
  region                  = var.aws_region
}