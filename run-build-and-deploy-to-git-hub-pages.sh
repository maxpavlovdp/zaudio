sh ./webapp/srcJekyll/deploy.sh
cp -R ./webapp/public/* ./docs/
git add -A
git commit -m "Deploy using run-build-and-deploy-to-git-hub-pages.sh"
git push
