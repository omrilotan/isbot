#!/usr/bin/env node

const { promises: { readFile, writeFile } } = require('fs')
const { join } = require('path')
const YAML = require('yaml')

/**
 * Create array without the duplicates
 * @param  {Array} list
 * @return {Array}
 */
const dedup = list => Array.from(new Set(list))

/**
 * Return a lowercase copy
 * @param  {string} str
 * @return {string}
 */
const downcase = str => str.toLowerCase()

async function start () {
  await Promise.all([
    sortYamlFile('../tests/fixtures/manual-crawlers-list.yml'),
    sortYamlFile('../tests/fixtures/manual-legit-browsers.yml'),
    sortTextFile('../tests/fixtures/user-agents.net-bots-ignore-list.txt'),
    sortJSON('../list.json')
  ])
}

start()

/**
 * Case insensitive Sort
 * @param  {String} a
 * @param  {String} b
 * @return {Number}
 */
function sort (a, b) {
  a = a.toLowerCase()
  b = b.toLowerCase()

  return a > b ? 1 : b > a ? -1 : 0
}

/**
 * Read, sort, and save JSON file
 * @param  {String} filename
 * @return {undefined}
 */
async function sortJSON (filename) {
  const filepath = join(__dirname, filename)
  const list = require(filename)

  await writeFile(
    filepath,
    JSON.stringify(
      dedup(list).sort(sort),
      null,
      2
    ) + '\n'
  )
}

/**
 * Read, sort, and save Yaml file
 * @param  {String} filename
 * @return {undefined}
 */
async function sortYamlFile (filename) {
  const filepath = join(__dirname, filename)
  const content = (await readFile(filepath)).toString()
  const data = YAML.parse(content)

  const sorted = Object.fromEntries(
    Object.entries(
      data

    // Sort keys
    ).sort(
      ([_a], [_b]) => {
        const [a, b] = [_a, _b].map(downcase)

        return a > b ? 1 : a < b ? -1 : 0
      }

    // Remove duplicates and sort lists
    ).map(
      ([k, v]) => [k, dedup(v).sort((a, b) => a > b ? 1 : a < b ? -1 : 0)]
    )
  )

  YAML.scalarOptions.str.fold.lineWidth = Infinity

  await writeFile(
    filepath,
    YAML.stringify(sorted)
  )
}

/**
 * Read, sort, and save text file
 * @param  {String} filename
 * @return {undefined}
 */
async function sortTextFile (filename) {
  const filepath = join(__dirname, filename)
  const lines = dedup(
    (await readFile(filepath)).toString()
      .split('\n')
      .filter(Boolean)
      .sort(sort)
  )
    .join('\n')
    .concat('\n')

  await writeFile(
    filepath,
    lines
  )
}
