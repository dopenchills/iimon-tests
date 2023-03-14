terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
}

provider "aws" {
  region  = "us-east-1"
}

variable "bucket_name" {
  type = string
}

variable "sample_file_path" {
  type = string
}

variable "sample_file_key" {
  type = string
}

resource "aws_s3_bucket" "b" {
  bucket = var.bucket_name
}

resource "aws_s3_object" "sample" {
  bucket = var.bucket_name
  key    = var.sample_file_key
  source = var.sample_file_path
  etag   = filemd5(var.sample_file_path)
  depends_on = [
    aws_s3_bucket.b
  ]
}
