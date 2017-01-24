#!/usr/bin/env bash
apt-get install python2.7
curl -O https://bootstrap.pypa.io/get-pip.py
python27 get-pip.py
pip install awscli
aws s3 help