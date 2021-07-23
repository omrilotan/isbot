#!/usr/bin/env node

const { promises: { mkdir, writeFile } } = require('fs')
const { join } = require('path')
const write = require('../lib/write')
const args = require('./args')
const build = require('./build')
const { download } = require('./externals')

const { log } = console

/**
 * scripts/prepare.js [-f] [--force]
 */
start(process)

/**
 * Run this script
 * @paran {string[]} ø.argv
 * @returns {void}
 */
async function start ({ argv }) {
  const { force } = args({ argv })
  const fixturesDirectory = join(__dirname, '..', '..', 'fixtures')
  const downloadsDirectory = join(fixturesDirectory, 'downloads')

  await mkdir(downloadsDirectory, { recursive: true })
  const results = await download({ dir: downloadsDirectory, force })
  const news = results.reduce((a, b) => a + b)
  if (news) {
    log('Create new timestamp')
    await write(
      join(downloadsDirectory, 'downloaded'),
      new Date().toUTCString(),
      { stringify: false }
    )
  } else {
    log('No new files were downloaded')
  }

  log('Create fixtures JSON')
  const { browsers, crawlers } = await build({ fixturesDirectory, downloadsDirectory })
  await writeFile(
    join(fixturesDirectory, 'index.json'),
    JSON.stringify({ browsers, crawlers }, null, 2) + '\n'
  )
};
