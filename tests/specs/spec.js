/* eslint-env mocha */

import { strict as assert } from 'assert'
import isbot from '../../src/index.js'
import fixtures from '../../fixtures/index.json' assert { type: 'json' }

const { browsers = [], crawlers = [] } = fixtures

const { equal, fail, notEqual } = assert
let spawn

describe(
  'specs',
  () => {
    beforeEach(() => {
      spawn = isbot.spawn()
    })

    it('should not break with empty input', () => {
      equal(spawn(), false)
    })

    xit(`should return false for all ${browsers.length} browsers`, () => {
      const recognised = browsers.filter(spawn)

      recognised.length && fail([
        `Recognised as bots ${recognised.length} user agents:`,
        ...recognised.map(item => ` - ${item}`)
      ].join('\n'))
    })

    xit(`should return true for all ${crawlers.length} crawlers`, () => {
      const unrecognised = crawlers.filter(ua => !spawn(ua))
      unrecognised.length && fail([
        `Unrecognised as bots ${unrecognised.length} user agents:`,
        ...unrecognised.map(item => ` - ${item}`)
      ].join('\n'))
    })

    describe('spawn.extend', () => {
      const useragent = 'Mozilla/5.0 (Linux) Randomagent/93.0'
      const rule = 'randomagent/\\d+\\.\\d+'

      it(`should not detect "${rule}" as bot`, () => {
        assert(!spawn(useragent))
      })

      it(`should detect "${rule}" as bot`, () => {
        spawn.extend([rule])
        assert(spawn(useragent))
      })

      it('should not extend an existing item', () => {
        spawn.extend([rule])
        spawn.extend([rule])
        spawn.extend([rule])
        spawn.exclude([rule])
        assert(!spawn(useragent))
      })
    })

    describe('spawn.exclude', () => {
      const useragent = 'Mozilla/5.0 (Macintosh; intel mac os x 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.175 Safari/537.36 Chrome-Lighthouse'
      const rule = 'chrome-lighthouse'

      it(`should detect "${rule}" as bot`, () => {
        assert(spawn(useragent))
      })

      it(`should not detect "${rule}" as bot`, () => {
        spawn.exclude([rule])
        assert(!spawn(useragent))
      })

      it('should remain silent when excluding non existing filter', () => {
        spawn.exclude(['something'])
      })
    })

    describe('spawn.find', () => {
      it('should not break with empty input', () => {
        equal(spawn.find(), null)
      })

      it('should return null for non bot browser', () => {
        equal(spawn.find('Mozilla/5.0 (Linux) Firefox/93.0'), null)
      })

      it('should return the rule used to identify as bot', () => {
        equal(spawn.find('Mozilla/5.0 (compatible; SemrushBot-SA/0.97; +http://www.semrush.com/bot.html)'), 'Bot')
      })

      it('should be able to remove match using find', () => {
        const ua = 'Mozilla/5.0 (Linux; Android 10; SNE-LX1 Build/HUAWEISNE-L21; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/94.0.4606.71 Mobile Safari/537.36 hap/1079/huawei com.huawei.fastapp/11.4.1.310 com.frvr.worlds.quickapp/4.0.17 ({"packageName":"quickSearch","type":"other","extra":"{}"})'
        equal(spawn(ua), true)
        spawn.exclude(spawn.matches(ua))
        equal(spawn(ua), false)
      })
    })

    describe('spawn.clear', () => {
      it('should clear all rules relevant to a user agent string', () => {
        const ua = 'Mozilla/5.0 (Linux; Android 10; SNE-LX1 Build/HUAWEISNE-L21; wv) AppleWebKit/537.36 (KHTML, like Gecko) Spider/1.0 Robot/1.0 Search/1.0 Chrome/94.0.4606.71'
        equal(spawn(ua), true)
        spawn.clear(ua)
        equal(spawn(ua), false)
      })

      it('should clear the pattern', () => {
        equal(spawn('Chrome-Lighthouse'), true)
        spawn.clear(['chrome-lighthouse'])
        equal(spawn('Chrome-Lighthouse'), false)
      })
    })

    describe('spawn.spawn', () => {
      it('should spawn isbot with its own list', () => {
        const newUA = 'Mozilla/5.0 (Linux) NeoBrowser/93.0'
        const botUA = 'Mozilla/5.0 (compatible; SemrushBot-SA/0.97; +http://www.semrush.com/bot.html)'
        const spawn2 = spawn.spawn(['neobrowser'])
        assert(!spawn(newUA))
        assert(spawn2(newUA))
        assert(spawn(botUA))
        assert(!spawn2(botUA))
      })
      it('should not affect each others lists', () => {
        const newUA = 'Mozilla/5.0 (Linux) NeoBrowser/93.0'
        const spawn1 = spawn.spawn()
        const spawn2 = spawn.spawn()
        spawn1.extend(['neobrowser'])
        assert(spawn1(newUA))
        assert(!spawn2(newUA))
      })
      it('should spawn from instance\'s list', () => {
        const newUA = 'Mozilla/5.0 (Linux) NeoBrowser/93.0'
        const spawn1 = spawn.spawn()
        spawn1.extend(['neobrowser'])
        const spawn2 = spawn1.spawn()
        assert(spawn2(newUA))
      })
    })

    describe('spawn.pattern', () => {
      it('should expose the regular expression', () => {
        assert(spawn.pattern instanceof RegExp)

        const { pattern: re1 } = spawn
        const { pattern: re2 } = spawn

        notEqual(re1, re2)
        equal(re1.toString(), re2.toString())

        re2.compile('something')
        notEqual(re1.toString(), re2.toString())
      })
    })
  }
)
