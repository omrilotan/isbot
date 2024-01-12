#!/usr/bin/env bash

failures=0

node --expose-gc node_modules/.bin/jest --verbose $@
failures=$((failures + $?))

echo $(which es-check)
if [[ -z $(which es-check) ]]; then
	echo "es-check not found. install locally."
	npm install es-check --no-save
	failures=$((failures + $?))
fi

es-check es2015 index.iife.js
failures=$((failures + $?))

echo -e "→ Number of failures: ${failures}"
exit $failures
