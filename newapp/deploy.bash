#!/usr/bin/env bash
set -x

git config --global user.email "maxpavlov.dp@gmail.com"
git config --global user.name "Deploy user"
git config --global push.default simple

eval "$(ssh-agent -s)"
ssh-add ./deploy
echo -e "Host github.com (192.30.253.112)\n\tStrictHostKeyChecking no\n" >> ~/.ssh/config
git clone --depth 1  git@github.com:maxpavlovdp/jetaudio.git

cd ./jetaudio
rm -rf *
cp -r ../public/* .
git add **
git commit -m "deploy from bitbucket pipeline"
git push