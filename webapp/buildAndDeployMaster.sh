#!/usr/bin/env bash


cd srcJekyll
bundle exec jekyll build

cd ../
export CI=true
npm install
npm install webpack -g
webpack -p
cp ./src/config/prodConfig.js ./public/config.js



sh ./deploy-to-s3/deployToMaster.sh
