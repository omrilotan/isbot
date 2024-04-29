#!/usr/bin/env bash

failures=0

echo "→ Build Regular Expression"
scripts/build/pattern.js
failures=$((failures + $?))

echo "→ Build commonjs"
esbuild src/index.ts --outfile=index.js --bundle --platform=neutral --format=cjs --log-level=warning --target=es2016
failures=$((failures + $?))

echo "→ Build esm"
esbuild src/index.ts --outfile=index.mjs --bundle --platform=neutral --format=esm --log-level=warning --target=es2016
failures=$((failures + $?))

echo "→ Build browser file (iife)"
esbuild src/browser.ts --outfile=index.iife.js --bundle --platform=neutral --format=iife --log-level=warning --target=es2016
failures=$((failures + $?))

echo "→ Build TypeScript declaration file"
tsc src/index.ts --declaration --emitDeclarationOnly --resolveJsonModule --esModuleInterop --outDir .
failures=$((failures + $?))

echo -e "→ Number of failures: ${failures}"
exit $failures
