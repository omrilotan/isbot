#!/usr/bin/env node

const { join } = require('path')
const sortJSON = require('./sortJSON')
const sortYamlFile = require('./sortYamlFile')

start()

async function start () {
  await Promise.all([
    sortYamlFile(join(__dirname, '..', '..', 'fixtures', 'crawlers.yml')),
    sortYamlFile(join(__dirname, '..', '..', 'fixtures', 'browsers.yml')),
    sortJSON(join(__dirname, '..', '..', 'src', 'list.json'))
  ])
}
