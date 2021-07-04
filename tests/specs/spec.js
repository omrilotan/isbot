/* eslint-env mocha */

import { strict } from 'assert'
import isbot from '../../src/index.js'
import fixtures from '../../fixtures/index.json'

const { browsers = [], crawlers = [] } = fixtures
const { fail } = strict

describe(
  'specs',
  () => {
    it(`should return false for all ${browsers.length} browsers`, () => {
      const recognised = browsers.filter(isbot)
      recognised.length && fail([
        `Recognised as bots ${recognised.length} user agents:`,
        ...recognised
      ].join('\n'))
    })

    it(`should return true for all ${crawlers.length} crawlers`, () => {
      const unrecognised = crawlers.filter(ua => !isbot(ua))
      unrecognised.length && fail([
        `Unrecognised as bots ${unrecognised.length} user agents:`,
        ...unrecognised.map(item => ` - ${item}`)
      ].join('\n'))
    })
  }
)
