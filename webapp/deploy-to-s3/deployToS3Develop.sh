#!/usr/bin/env bash
set -x
cd "$(dirname "$0")"

rm -rf ~/.aws
mkdir ~/.aws

echo "[default]" >> ~/.aws/credentials
echo "aws_access_key_id=AKIAILWAFXOS46EG6SXQ" >> ~/.aws/credentials
echo "aws_secret_access_key=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" >> ~/.aws/credentials

echo "[default]" >> ~/.aws/config
echo "region=eu-central-1" >> ~/.aws/config
echo "output=json" >> ~/.aws/config

bucketName=zas-develop-branch
cp ../src/config/prodConfig.js ../public/config.js
aws s3 sync --delete ../public/ s3://$bucketName

aws s3api put-bucket-policy --bucket $bucketName --policy ./developBucketPolicy.json