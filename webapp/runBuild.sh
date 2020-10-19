##!/usr/bin/env bash
cd "$(dirname "$0")"
cp ./src/config/prodConfig.js ./public/config.js
webpack
