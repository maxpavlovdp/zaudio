sh #!/usr/bin/env bash
cd "$(dirname "$0")"
cd srcJekyll
bundle exec jekyll build -w
