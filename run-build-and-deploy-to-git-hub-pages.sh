cd "$(dirname "$0")"
sh ./webapp/srcJekyll/deploy.sh
sh ./webapp/runBuild.sh

cp -R ./webapp/public/* ./docs/
cp -R ./webapp/public/assets ./docs/sketches/
cp -R ./webapp/public/assets ./docs/buySound
cp -R ./webapp/public/assets ./docs/contacts
cp -R ./webapp/public/assets ./docs/forCommunity
cp -R ./webapp/public/assets ./docs/forInvestors
cp -R ./webapp/public/assets ./docs/mission

git add -A
git commit -m "Deploy using run-build-and-deploy-to-git-hub-pages.sh"
git push
