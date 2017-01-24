#!/usr/bin/env bash
curl -O https://bootstrap.pypa.io/get-pip.py
python2.7 get-pip.py
pip install awscli
aws s3 help