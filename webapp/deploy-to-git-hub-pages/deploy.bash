#!/usr/bin/env bash
set -x
cd "$(dirname "$0")"

git config --global user.email "maxpavlov.dp@gmail.com"
git config --global user.name "Deploy user"
git config --global push.default simple

eval "$(ssh-agent -s)"

mkdir ~/.ssh
touch ~/.ssh/known_hosts
chmod 600 ./deploy_rsa
ssh-add ./deploy_rsa
ssh-keyscan github.com >> ~/.ssh/known_hosts
git clone git@github.com:maxpavlovdp/jetaudio.git

cd ./jetaudio
rm -rf *
# Copy prod config
cp ././../src/config/prodConfig.js ../../public/config.js
cp -r ../../public/* .
git add **
git commit -m "deploy from bitbucket pipeline"
git push