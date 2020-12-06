#!/usr/bin/env node

const { promises: { writeFile } } = require('fs')
const contributors = require('../contributors.json')

const sortBy = (list, key) => list.sort(
  function (a, b) {
    const [_a, _b] = [a, b].map(i => i[key])
    if (_a < _b) return 1
    if (_a > _b) return -1
    return 0
  }
)

start()

async function start () {
  const AUTHORS = sortBy(contributors, 'contributions').map(
    ({ login, html_url: url }) => `${login} (${url})\n`
  ).join('')

  await writeFile(
    'AUTHORS',
    AUTHORS
  )
}
