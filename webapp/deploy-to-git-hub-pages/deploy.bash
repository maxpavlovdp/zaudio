#!/usr/bin/env bash
set -x

cd "$(dirname "$0")"

eval "$(ssh-agent -s)"

# Configure github pages access
cd "$(dirname "$0")"
git config --global user.email "maxpavlov.dp@gmail.com"
git config --global user.name "Deploy user"
git config --global push.default simple

mkdir -p ~/.ssh
touch ~/.ssh/known_hosts
chmod 600 ./deploy_rsa
ssh-add ./deploy_rsa
ssh-keyscan github.com >> ~/.ssh/known_hosts

# Push new build to github pages
git clone --depth=1 git@github.com:maxpavlovdp/jetaudio.git
cd ./jetaudio
rm -rf *
cp -r ../../dist/* .
git add **
git commit -m "deploy from bitbucket pipeline"
git push