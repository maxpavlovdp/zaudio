#!/usr/bin/env bash
cd "$(dirname "$0")"
sh ./webapp/srcJekyll/deploy.sh
cd ./webapp
cp ./src/config/prodConfig.js ./public/config.js
#cp ./src/config/devConfig.js ./public/config.js
npm run devserver
