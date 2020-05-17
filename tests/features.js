/* eslint-env mocha */

const assert = require('assert')
const { fresh } = require('./helpers')
let isbot

describe('features', function () {
  beforeEach(function () {
    isbot = fresh()
  })

  describe('isbot', function () {
    it('should always return a boolean', function () {
      [
        'Mozilla', 'Googlebot', 'Something else'
      ].map(isbot).forEach(
        result => assert.strictEqual(typeof result, 'boolean')
      )
    })
  })

  describe('isbot.extend', function () {
    const useragent = 'Mozilla/5.0'
    const rule = '^mozilla\\/\\d\\.\\d$'

    it(`should not detect "${useragent}" as bot`, function () {
      assert(!isbot(useragent))
    })

    it(`should detect "${useragent}" as bot`, function () {
      isbot.extend([rule])
      assert(isbot(useragent))
    })

    it('should not extend an existing item', function () {
      isbot.extend([rule])
      isbot.extend([rule])
      isbot.extend([rule])
      isbot.exclude([rule])
      assert(!isbot(useragent))
    })
  })

  describe('isbot.exclude', function () {
    const useragent = 'axios/1.2'
    const rule = '^axios/'

    it(`should not detect "${useragent}" as bot`, function () {
      assert(isbot(useragent))
    })

    it(`should detect "${useragent}" as bot`, function () {
      isbot.exclude([rule])
      assert(!isbot(useragent))
    })
  })

  describe('isbot.find', function () {
    it('should return null for non bot browser', function () {
      assert.strictEqual(isbot.find('Mozilla'), null)
    })

    it('should return the rule used to identify as bot', function () {
      assert.strictEqual(isbot.find('Googlebot'), 'bot')
    })
  })
})
