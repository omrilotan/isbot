#!/usr/bin/env bash

failures=0

echo "→ Sort lists"
./scripts/sort/index.js
failures=$((failures + $?))

echo "→ Format files"
npx prettier --write .
failures=$((failures + $?))

echo "→ Number of failures: ${failures}"
exit $failures
