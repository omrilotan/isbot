#!/usr/bin/env bash

failures=0

echo "→ Build Regular Expression"
scripts/build/pattern.js
failures=$((failures + $?))

echo "→ Build files (index.js, index.mjs) and TypeScript declaration file (index.d.ts)"
tsup src/index.ts --format cjs,esm --dts --out-dir . --target es2019
failures=$((failures + $?))

echo "→ Build browser (global) file"
tsup src/browser.ts --format iife --out-dir . --target es2015 --minify --sourcemap
failures=$((failures + $?))

echo -e "→ Number of failures: ${failures}"
exit $failures
