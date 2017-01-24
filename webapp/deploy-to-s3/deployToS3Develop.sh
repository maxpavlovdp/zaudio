#!/usr/bin/env bash
set -x
cd "$(dirname "$0")"

./configureAWS.sh

bucketName=zas-develop-branch
aws s3 sync --delete ../public/ "s3://$bucketName"

aws s3api put-bucket-policy --bucket "$bucketName" --policy ./developBucketPolicy.json