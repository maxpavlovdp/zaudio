#!/usr/bin/env bash
yum install python27 -y
curl -O https://bootstrap.pypa.io/get-pip.py
python27 get-pip.py
pip install awscli
aws s3 help