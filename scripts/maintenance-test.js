#!/usr/bin/env node

const exec = require('async-execute')

exec('npm run unit')
  .then(
    () => process.exit(1)
  )
  .catch(
    () => console.log('issue_body="Tests failed. there\'s possibly a new bot to add, please look into this download fixtures and rerun tests)"')
  )
