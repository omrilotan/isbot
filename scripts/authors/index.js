#!/usr/bin/env node

const { promises: { writeFile } } = require('fs')
const { join } = require('path')
const client = require('../lib/client')
const sortBy = require('./sortBy')

start()

async function start () {
  const response = await client({
    url: 'https://api.github.com/repos/omrilotan/isbot/contributors',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'omrilotan/isbot'
    }
  })

  const contributors = sortBy(
    JSON.parse(response),
    'contributions').map(
    ({ login, html_url: url }) => `${login} (${url})\n`
  ).join('')

  await writeFile(
    join(__dirname, '..', '..', 'AUTHORS'),
    contributors
  )
}
