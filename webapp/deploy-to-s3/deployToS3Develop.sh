#!/usr/bin/env bash
curl -O https://bootstrap.pypa.io/get-pip.py
python get-pip.py
pip install awscli
aws s3 help