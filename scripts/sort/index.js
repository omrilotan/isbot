#!/usr/bin/env node

const { join } = require('path')
const sortJSON = require('./sortJSON')
const sortYamlFile = require('./sortYamlFile')

start()

async function start () {
  const errors = []

  async function call (fn, ...args) {
    try {
      await fn.apply(this, args)
    } catch (error) {
      errors.push(error)
    }
  }

  await Promise.all([
    call(sortYamlFile, join(__dirname, '..', '..', 'fixtures', 'crawlers.yml')),
    call(sortYamlFile, join(__dirname, '..', '..', 'fixtures', 'browsers.yml')),
    call(sortJSON, join(__dirname, '..', '..', 'src', 'list.json'))
  ])
  errors.forEach(error => console.error(error))
  process.exitCode = errors.length
}
