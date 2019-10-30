/* eslint-env mocha */

const { bold } = require('chalk')
const { cleanup } = require('./helpers')
let isBot = require('..')
const list = require('../list.json').slice()
const { length } = list

describe('Check for redundant crawler rules', function () {
  this.timeout(15000)
  afterEach(function () {
    cleanup()
    isBot = require('..')
  })

  it(`should include ${bold(length)} non redundant rules`, function () {
    const redundants = []
    while (true) {
      const rule = list.pop()
      if (!rule) {
        break
      }

      isBot.exclude([rule])
      const match = isBot.find(rule)
      if (match) {
        redundants.push(`"${rule}" matched with rule "${match}" (${list.indexOf(rule)})`)
      }
      isBot.extend([rule])
    }

    if (redundants.length) {
      throw new Error(`Found ${redundants.length}/${length} rules which include redundant strings:\n${redundants.map(redundant => ` - ${redundant}`).join('\n')}`)
    }
  })
})
