#!/usr/bin/env bash
set -e # halt script on error
cd "$(dirname "$0")"
bundle exec jekyll build
