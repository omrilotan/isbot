#!/usr/bin/env bash

git submodule foreach git add .
git submodule foreach git commit -m $(date +"%Y-%m-%d")
git submodule foreach git push origin downloads --force-with-lease
