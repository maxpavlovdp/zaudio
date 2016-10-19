#!/usr/bin/env bash
git clone https://github.com/maxpavlovdp/jetaudio.git
cd ./jetaudio
rm -rf *
cp -r ./public/* .
git add **
git commit -m "deploy from bitbucket pipeline"
git push