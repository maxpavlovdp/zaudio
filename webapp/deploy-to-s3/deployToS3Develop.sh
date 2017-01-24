#!/usr/bin/env bash
sudo yum install python27 -y
curl -O https://bootstrap.pypa.io/get-pip.py
sudo python27 get-pip.py
sudo pip install awscli
aws s3 help