/* eslint-env mocha */

const assert = require('assert')
const { bold } = require('chalk')
const UserAgent = require('user-agents')
const { fixture, listings } = require('./helpers')
const isBot = require('..')
const browsers = fixture('browsers.txt').split('\n')
const crawlers = fixture('crawlers.txt').split('\n')
const moreCrawlers = require('./fixtures/crawler-user-agents.json').reduce(
  (accumulator, { instances }) => accumulator.concat(instances),
  []
)

const BOTS = [
  'phantomjs',
  'chrome-lighthouse',
  'swurl',
  parseInt(process.versions.node) === 6 && 'cubot'
].filter(Boolean)

// Generate a list of unique user agent strings
const random = Array.from(
  new Set(
    Array(1000)
      .fill()
      .map(
        () => new UserAgent(({ userAgent }) => !new RegExp(BOTS.join('|'), 'i').test(userAgent)).toString()
      )
  )
)

describe('Test user-agent fixtures', function () {
  describe('Legit user agent strings', function () {
    it(`Should return false for ${bold(browsers.length)} user agent strings`, function () {
      const agents = browsers.filter(isBot)

      if (agents.length) {
        throw new Error(`${agents.length}/${browsers.length} user agents strings were detected as bots:\n${listings(agents)}`)
      }
    })
  })

  describe('Known crawler user agent strings', function () {
    it(`Should return true for ${bold(crawlers.length)} user agent strings`, function () {
      const agents = crawlers.filter(crawler => !isBot(crawler))

      if (agents.length) {
        throw new Error(`${agents.length}/${crawlers.length} user agents strings were not detected as bots:\n${listings(agents)}`)
      }
    })
  })

  describe('Imported known crawler user agent strings', function () {
    it(`Should return true for ${bold(moreCrawlers.length)} user agent strings`, function () {
      const agents = moreCrawlers.filter(crawler => !isBot(crawler))

      if (agents.length) {
        throw new Error(`${agents.length}/${moreCrawlers.length} user agents strings were not detected as bots:\n${listings(agents)}`)
      }
    })
  })

  describe('Random legit user agents', function () {
    it(`should return false for ${bold(random.length)} random user agent strings`, function () {
      const bots = []

      random.forEach(useragent => isBot(useragent) && bots.push(useragent))

      if (bots.length) {
        throw new Error(`Detected ${bots.length} user agent strings as bots:\n${listings(bots)}`)
      }
    })
  })

  describe('patches', function () {
    const cubot = 'Mozilla/5.0 (Linux; Android 8.0.0; CUBOT_P20) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Mobile Safari/537.36'

    try {
      /\d+(?!%)/.exec('I\'ve got 99 problems and a bot ain\'t one')

      it('should apply CUBOT patch when lookbehind assertion is supported', function () {
        assert(!isBot(cubot))
      })
    } catch (error) {
      xit('does not support lookbehind assertion')
    }
  })
})
