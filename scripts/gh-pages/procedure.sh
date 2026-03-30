#!/usr/bin/env bash

failures=0

message="$(curl -s https://whatthecommit.com/index.txt)"
git config --global user.name "$(git show -s --format=%an)"
git config --global user.email "$(git show -s --format=%ae)"

origin=$(git config --get remote.origin.url)
auth_origin="$origin"

if [ -n "$GITHUB_TOKEN" ] && [[ "$origin" == https://github.com/* ]]; then
	auth_origin="${origin/https:\/\/github.com\//https:\/\/x-access-token:${GITHUB_TOKEN}@github.com\/}"
fi

exists=$(git ls-remote --heads ${auth_origin} gh-pages)

echo "Clone gh-pages branch from ${origin}"
if [ -z "$exists" ]; then
	mkdir -p GHPAGES_DIR
	cp -r .git GHPAGES_DIR
	cd GHPAGES_DIR
	git checkout -b gh-pages
	git remote set-url origin "$auth_origin"
else
	git clone -b gh-pages --single-branch $auth_origin GHPAGES_DIR
	cd GHPAGES_DIR
fi

echo "Add CNAME"
ls | grep -v CNAME | xargs rm -rf
cd ../

echo "Copy docs to gh-pages branch"
cp -R ./docs/* ./GHPAGES_DIR

cd GHPAGES_DIR
git add .
git commit -m "$message"
git push origin gh-pages
cd ../

echo "→ Number of failures: ${failures}"
exit $failures
