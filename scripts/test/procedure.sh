#!/usr/bin/env bash

failures=0

set -e

## Setup
declare -A flags
args=()

for arg in "$@"; do
	case "$arg" in
		--no-build)
			flags["no-build"]=1
			;;
		*)
			args+=("$arg")
			;;
	esac
done

## Build if needed
if [[ ! -v flags["no-build"] ]]; then
	npm run build
	if [ $? -ne 0 ]; then
		exit $?
	fi
	npm run prepare
	if [ $? -ne 0 ]; then
		exit $?
	fi
fi

node --expose-gc node_modules/.bin/jest --verbose $@
failures=$((failures + $?))

## Check builds if needed
if [[ ! -v flags["no-build"] ]]; then
	echo $(which es-check)
	if [[ -z $(which es-check) ]]; then
		echo "es-check not found. install locally."
		npm install es-check --no-save
		failures=$((failures + $?))
	fi

	es-check es2015 browser.global.js
	failures=$((failures + $?))
fi

echo -e "→ Number of failures: ${failures}"
exit $failures
