sh ./webapp/srcJekyll/deploy.sh
sh ./webapp/runBuild.sh
cp -R ./webapp/public/* ./docs/
git add -A
git commit -m "Deploy using run-build-and-deploy-to-git-hub-pages.sh"
git push
