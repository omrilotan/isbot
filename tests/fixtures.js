/* eslint-env mocha */

const assert = require('assert')
const { bold } = require('chalk')
const { listings, crawlers, browsers } = require('./helpers')
const isbot = require('..')

describe('fixtures', () => {
  describe('Test user-agent fixtures', function () {
    it(`Should return false for ${bold(browsers.length)} user agent strings`, function () {
      const agents = browsers.filter(isbot)

      if (agents.length) {
        throw new Error(`${agents.length}/${browsers.length} user agents strings were detected as bots:\n${listings(agents)}`)
      }
    })

    it(`Should return true for ${bold(crawlers.length)} known crawler user agent strings`, function () {
      const agents = crawlers.filter(crawler => !isbot(crawler))

      if (agents.length) {
        throw new Error(`${agents.length}/${crawlers.length} user agents strings were not detected as bots:\n${listings(agents)}`)
      }
    })
  })

  describe('patches', function () {
    const cubot = 'Mozilla/5.0 (Linux; Android 8.0.0; CUBOT_P20) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Mobile Safari/537.36'

    try {
      /(?<! cu)bot/.test('dangerbot')

      it('should apply CUBOT patch when lookbehind assertion is supported', function () {
        assert(!isbot(cubot))
      })
    } catch (error) {
      xit('does not support lookbehind assertion')
    }
  })
})
