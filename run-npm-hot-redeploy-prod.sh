##!/usr/bin/env bash
cd ./webapp
cp ./src/config/prodConfig.js ./public/config.js
#cp ./src/config/devConfig.js ./public/config.js
npm run devserver
