##!/usr/bin/env bash
cd "$(dirname "$0")"
cp ./src/config/devConfig.js ./public/config.js
npm run devserver
