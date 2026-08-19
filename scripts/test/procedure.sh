#!/usr/bin/env bash

failures=0

set -e

## Setup
no_build=0
args=()

for arg in "$@"; do
	case "$arg" in
		--no-build)
			no_build=1
			;;
		*)
			args+=("$arg")
			;;
	esac
done

## Build if needed
if [[ $no_build -eq 0 ]]; then
	npm run build
	if [ $? -ne 0 ]; then
		exit $?
	fi
	npm run prepare
	if [ $? -ne 0 ]; then
		exit $?
	fi
fi

node --expose-gc node_modules/.bin/jest --verbose "${args[@]}"
failures=$((failures + $?))

## Check builds if needed
if [[ $no_build -eq 0 ]]; then
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
