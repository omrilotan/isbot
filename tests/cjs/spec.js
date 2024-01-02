/* eslint-env mocha */

const { strictEqual } = require('assert')
const isbotDefault = require('isbot')
const { isbot } = require('isbot')

describe(
  'cjs',
  () => [
    ['Mozilla/5.0 (Windows; rv:81.0) Gecko/20100101 Firefox/81.0', false],
    ['Mozilla/5.0 (Windows; rv:81.0) Gecko/20100101 Unkown/81.0', false],
    ['Unknown Tool/1.0', true],
    ['Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Googlebot/2.1; +http://www.google.com/bot.html) Chrome/84.0.4147.108 Safari/537.36', true]
  ].forEach(
    ([ua, result]) => it(
      `should return ${result} for ${ua}`,
      () => {
        strictEqual(isbot(ua), result)
        strictEqual(isbotDefault(ua), result)
      }
    )
  )
)
