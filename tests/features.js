/* eslint-env mocha */

const assert = require('assert')
const { cleanup } = require('./helpers')
let isBot = require('..')

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
    const useragent = 'Mozilla/5.0'
    const rule = '^mozilla\\/\\d\\.\\d$'

    it(`should not detect "${useragent}" as bot`, function () {
      assert(!isBot(useragent))
    })

    it(`should detect "${useragent}" as bot`, function () {
      isBot.extend([rule])
      assert(isBot(useragent))
    })

    it('should not extend an existing item', function () {
      isBot.extend([rule])
      isBot.extend([rule])
      isBot.extend([rule])
      isBot.exclude([rule])
      assert(!isBot(useragent))
    })

    it('should treat extend as case insensitive (will extend existing rule with different case)', function () {
      isBot.extend(['^Axios/'])
      isBot.find('^Axios/')
      isBot.exclude(['^Axios/'])
      assert(!isBot('Axios/'))
    })
  })

  describe('isbot.exclude', function () {
    const useragent = 'Mozilla/4.0 (compatible; B-l-i-t-z-B-O-T)'
    const rule = 'B-l-i-t-z-B-O-T'

    it(`should not detect "${useragent}" as bot`, function () {
      assert(isBot(useragent))
    })

    it(`should detect "${useragent}" as bot`, function () {
      isBot.exclude([rule])
      assert(!isBot(useragent))
    })

    it('should treat exclude as case insensitive (will exclude duplicates with different case)', function () {
      isBot.extend([rule])
      isBot.exclude([rule.toUpperCase()])
      assert(!isBot(useragent))
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
