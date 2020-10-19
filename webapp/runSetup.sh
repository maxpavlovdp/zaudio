#!/usr/bin/env bash
cd "$(dirname "$0")"
cd ./webapp
rm -rf node_modules
#sudo npm install -g webpack webpack-dev-server
npm i
gem install jekyll bundler
