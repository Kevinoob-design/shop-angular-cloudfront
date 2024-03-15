# Shop Angular Cloudfront

Angular version: ~17.

## The purpose

The repository was created to have an Angular version of e-shop for EPAM NodeJS AWS course. At the same time we strive
to make this repository follows best practices so it may be used as a starter for new projects with all the necessary
toolings already set up.

## NodeJS AWS course integration

All the necessary API endpoints are in the environments files `environment.ts` (for dev builds). Also it contains
feature flags to enable/disable endpoints invocations from within the app so to ensure that you don't get errors for not
implemented API endpoints.

## Contribution

Create an issue with the detailed description of the improvement/issue.

If you would like to help implementing some feature, you should ask the maintainers for approval so to ensure that the
feature is desired in the repository and no efforts go wasted.

## Get up and running

Prerequisites: NodeJS 20.x and higher

Follow the steps:

- git clone
- npm i
- ng serve

## Deploying to AWS

- if bucket and cloud front distribution haven't been deployed the first time:

  - ensure to have dev-dependencies installed and run command `yarn sls` or without dev-dependencies
    `npx --no-install serverless`

- to upload files to AWS S3 bucket and invalidate cloud distribution you can run: `yarn client:deploy`

## URL for both S3 Host and CloudFront Host

- [S3 Host](http://aws-learn-cloud-practitioner.s3-website-us-east-1.amazonaws.com/) should return `403 forbidden`

- [CloudFront Host](https://d3qmp603iowzgx.cloudfront.net/) should work properly
