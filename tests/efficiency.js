/* eslint-env mocha */

const { Worker } = require('worker_threads')
const { resolve } = require('path')
const { bold } = require('chalk')
const { update, end } = require('stdline')
const { crawlers } = require('./helpers')
const list = require('../list.json').slice()
const expressions = list.map(item => new RegExp(item, 'i'))
const script = resolve(__dirname, '.rule-efficiency.js')
const { length } = list

describe('efficiency', () => {
  describe(`Check for ${bold(length)} rules with ${crawlers.length} user agent strings`, function () {
    this.timeout(length * 1000)

    it(`${length} rules are not already covered by other rules`, function (done) {
      const errors = []
      list.forEach(rule => {
        const redundant = expressions.filter(
          expression => expression.source.replace(/\\/g, '') !== rule
        ).find(
          expression => expression.test(rule)
        )

        if (redundant) {
          if (!redundant.source.startsWith('^')) {
            errors.push(`Rule "${rule}" is made redundant by rule "${redundant.source}"`)
          }
        }
      })

      if (errors.length) {
        throw new Error([
          `Found issues with ${errors.length} rules`,
          ...errors
        ].join('\n'))
      }
      done()
    })

    it(`${length} rules are not necessary, and have examples`, function (done) {
      const errors = []
      update(`${length - list.length}/${length}. Error count: ${errors.length}`)

      function next () {
        const rules = list.splice(0, 50)
        if (!rules.length) {
          fin()
          return
        }

        // Relieve memory intensive processes by offloading batches to worker thread
        const worker = new Worker(script)
        worker.on(
          'message',
          (message) => {
            const response = JSON.parse(message)
            errors.push(...response)
            update(`${length - list.length}/${length}. Error count: ${errors.length}`)
            next()
          }
        )
        worker.postMessage(JSON.stringify(rules))
      }
      next()

      function fin () {
        end()
        if (errors.length) {
          throw new Error([
            `Found issues with ${errors.length} rules`,
            ...errors
          ].join('\n'))
        }
        done()
      }
    })
  })
})
