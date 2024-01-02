#!/usr/bin/env bash

failures=0

if [ -e "index.js" ]; then
	echo "→ Build files found, skip build"
else
	echo "→ Build"
	npm run build
fi
failures=$((failures + $?))

echo "→ Create AUTHORS file"
./scripts/authors/index.js
failures=$((failures + $?))

echo -e "→ Number of failures: ${failures}"
exit $failures
