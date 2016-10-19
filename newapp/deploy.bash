#!/usr/bin/env bash
set -x
git config --global user.email "maxpavlov.dp@gmail.com"
git config --global user.name "Deploy user"
git config --global push.default simple
git config --global credential.helper store
ps: Add-Content "$env:USERPROFILE\.git-credentials" "https://264aac49eacabfceb4296bafff349ec4ddf076fe:x-oauth-basic@github.com"

git clone --depth 1  https://github.com/maxpavlovdp/jetaudio.git
cd ./jetaudio
rm -rf *
cp -r ../public/* .
git add **
git commit -m "deploy from bitbucket pipeline"
git push