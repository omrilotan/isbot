/* eslint-env mocha */

const assert = require('assert')
const { cleanup } = require('./helpers')
let isBot = require('..')

const customBrowser = 'Mozilla/5.0'
const extendList = ['^mozilla/\\d\\.\\d$']
const cubot = 'Mozilla/5.0 (Linux; Android 8.0.0; CUBOT_P20) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Mobile Safari/537.36'
const excludedFilters = ['bot']

describe('Features', function () {
  afterEach(function () {
    cleanup()
    isBot = require('..')
  })

  describe('isbot', function () {
    it('should always return a boolean', function () {
      [
        'Mozilla', 'Googlebot', 'Something else'
      ].map(isBot).forEach(
        result => assert.strictEqual(typeof result, 'boolean')
      )
    })
  })

  describe('isbot.extend', function () {
    it(`should not detect (${customBrowser}) as bot`, function () {
      assert(!isBot(customBrowser))
    })

    it(`should detect (${customBrowser}) as bot`, function () {
      isBot.extend(extendList)
      assert(isBot(customBrowser))
    })
  })

  describe('isbot.exclude', function () {
    it('should detect Cubot as bot', function () {
      assert(isBot(cubot))
    })

    it('should not detect Cubot as bot', function () {
      isBot.exclude(excludedFilters)
      assert(!isBot(cubot))
    })

    it('should detect Googlebot, but not Cubot (use case)', function () {
      assert(isBot('Googlebot'))
      assert(isBot(cubot))

      isBot.exclude(excludedFilters)
      isBot.extend(['googlebot'])

      assert(isBot('Googlebot'))
      assert(!isBot(cubot))
    })
  })

  describe('isbot.find', function () {
    it('should return null for non bot browser', function () {
      assert.strictEqual(isBot.find('Mozilla'), null)
    })

    it('should return the rule used to identify as bot', function () {
      assert.strictEqual(isBot.find('Googlebot'), 'bot')
    })
  })
})
