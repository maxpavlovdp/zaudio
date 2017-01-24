#!/usr/bin/env bash

rm -rf ~/.aws
mkdir ~/.aws

echo "[default]" >> ~/.aws/credentials
echo "aws_access_key_id=AKIAILWAFXOS46EG6SXQ" >> ~/.aws/credentials
echo "aws_secret_access_key=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" >> ~/.aws/credentials

echo "[default]" >> ~/.aws/config
echo "region=eu-central-1" >> ~/.aws/config
echo "output=json" >> ~/.aws/config