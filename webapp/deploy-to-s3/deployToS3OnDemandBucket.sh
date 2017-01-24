#!/usr/bin/env bash
set -x
cd "$(dirname "$0")"

./configureAWS.sh

bucketName=zas-on-demand-branch
aws s3 sync --delete ../public/ "s3://$bucketName"

aws s3api put-bucket-policy --bucket "$bucketName" --policy file://"$bucketName-policy.json"
