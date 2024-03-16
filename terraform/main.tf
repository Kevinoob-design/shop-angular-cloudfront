provider "aws" {
  region = "us-east-1"
}

resource "aws_s3_bucket" "front_end_bucket" {
  bucket = "aws-learn-cloud-practitioner-angular-shop-front-end"
}

resource "aws_s3_account_public_access_block" "front_end_bucket" {
  block_public_acls   = true
  block_public_policy = true
}

resource "aws_s3_bucket_public_access_block" "front_end_bucket" {
  bucket                  = aws_s3_bucket.front_end_bucket.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_website_configuration" "front_end_bucket" {
  bucket = aws_s3_bucket.front_end_bucket.id
  index_document {
    suffix = "index.html"
  }
  error_document {
    key = "index.html"
  }
}

resource "aws_cloudfront_distribution" "front_end_bucket_cloudfront_distribution" {
  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"
  comment             = "my cloudfront in front of the s3 bucket"

  origin {
    domain_name              = aws_s3_bucket.front_end_bucket.bucket_regional_domain_name
    origin_id                = "front-end-bucket-origin"
    origin_access_control_id = aws_cloudfront_origin_access_control.default.id
  }

  default_cache_behavior {
    min_ttl                = 0
    default_ttl            = 0
    max_ttl                = 0
    viewer_protocol_policy = "redirect-to-https"

    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "front-end-bucket-origin"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
  }

  restrictions {
    geo_restriction {
      locations        = []
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}

resource "aws_cloudfront_origin_access_control" "default" {
  name                              = "cloudfront OAC"
  description                       = "description of OAC"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

output "cloudfront_url" {
  value = aws_cloudfront_distribution.front_end_bucket_cloudfront_distribution.domain_name
}

data "aws_iam_policy_document" "front_end_bucket" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.front_end_bucket.arn}/*"]
    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }
    condition {
      test     = "StringEquals"
      variable = "aws:SourceArn"
      values   = [aws_cloudfront_distribution.front_end_bucket_cloudfront_distribution.arn]
    }
  }
}

resource "aws_s3_bucket_policy" "front_end_bucket_policy" {
  bucket = aws_s3_bucket.front_end_bucket.id
  policy = data.aws_iam_policy_document.front_end_bucket.json
}
