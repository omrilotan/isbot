/* eslint-env mocha */

import { strict } from 'assert'
import wait from '@lets/wait'
import list from '../../src/list.json' assert { type: 'json' }
import fixtures from '../../fixtures/index.json' assert { type: 'json' }
import stdline from 'stdline'

const { fail } = strict
const { crawlers = [] } = fixtures
const { update, end } = stdline
Object.freeze(list)

const clone = () => list.slice()

describe('efficiency', () => {
  describe(`All rules are needed. Check each one against ${crawlers.length} user agent strings`, () => {
    it('should find no unneeded rules', async function () {
      this.timeout(30000)

      const redundantRules = []

      let { length } = list
      while (--length) {
        update(`Check rule ${list.length - length}/${list.length}`)
        const temp = clone()
        const [rule] = temp.splice(length, 1)
        const pattern = new RegExp(temp.join('|'), 'i')
        const isbot = ua => pattern.test(ua)
        const unmatched = crawlers.filter(isbot)

        if (crawlers.length - unmatched.length === 0) {
          redundantRules.push(rule)
        }
        if (length % 50 === 0) {
          global.gc()
          await wait()
        }
      }
      end()
      redundantRules.length && fail([
        `Found ${redundantRules.length} redundant rules`,
        ...redundantRules
      ].join('\n'))
    })
  })
  describe(`Rules can not be prefixed with a hat. Check each one against ${crawlers.length} user agent strings`, () => {
    it('should not be missing a hat', async function () {
      this.timeout(30000)

      const rulesWithNoHat = []

      let { length } = list
      while (--length) {
        update(`Check rule ${list.length - length}/${list.length}`)
        const temp = clone()
        const [rule] = temp.splice(length, 1)
        if (rule.startsWith('^')) {
          continue
        }
        temp.push(`^${rule}`)
        const pattern = new RegExp(temp.join('|'), 'i')
        const isbot = ua => pattern.test(ua)
        const unmatched = crawlers.filter(isbot)

        if (unmatched.length === crawlers.length) {
          rulesWithNoHat.push(rule)
        }
        if (length % 50 === 0) {
          global.gc()
          await wait()
        }
      }
      end()
      rulesWithNoHat.length && fail([
        `Found ${rulesWithNoHat.length} rules with no hats`,
        ...rulesWithNoHat.map(rule => `Replace '${rule}' with '^${rule}'`)
      ].join('\n'))
    })
  })
})
