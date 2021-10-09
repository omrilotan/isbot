/* eslint-env mocha */

import { strict as assert } from 'assert'
import isbot from '../../src/index.js'
import fixtures from '../../fixtures/index.json'

const { browsers = [], crawlers = [] } = fixtures

const { equal, fail } = assert

describe(
  'specs',
  () => {
    it('should not break with empty input', () => {
      equal(isbot(), false)
    })

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

    describe('isbot.extend', () => {
      const useragent = 'Mozilla/5.0 (Linux) Randomagent/93.0'
      const rule = 'randomagent/\\d+\\.\\d+'

      it(`should not detect "${rule}" as bot`, () => {
        assert(!isbot(useragent))
      })

      it(`should detect "${rule}" as bot`, () => {
        isbot.extend([rule])
        assert(isbot(useragent))
      })

      it('should not extend an existing item', () => {
        isbot.extend([rule])
        isbot.extend([rule])
        isbot.extend([rule])
        isbot.exclude([rule])
        console.log(isbot.list)
        assert(!isbot(useragent))
      })
    })

    describe('isbot.exclude', () => {
      const useragent = 'Mozilla/5.0 (Macintosh; intel mac os x 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.175 Safari/537.36 Chrome-Lighthouse'
      const rule = 'chrome-lighthouse'

      it(`should detect "${rule}" as bot`, () => {
        assert(isbot(useragent))
      })

      it(`should not detect "${rule}" as bot`, () => {
        isbot.exclude([rule])
        assert(!isbot(useragent))
      })

      it('should remain silent when excluding non existing filter', () => {
        isbot.exclude(['something'])
      })
    })

    describe('isbot.find', () => {
      it('should not break with empty input', () => {
        equal(isbot.find(), null)
      })

      it('should return null for non bot browser', () => {
        equal(isbot.find('Mozilla/5.0 (Linux) Firefox/93.0'), null)
      })

      it('should return the rule used to identify as bot', () => {
        equal(isbot.find('Mozilla/5.0 (compatible; SemrushBot-SA/0.97; +http://www.semrush.com/bot.html)'), '(?<!(lib))http')
      })

      it('should be able to remove match using find', () => {
        const ua = 'Mozilla/5.0 (Linux; Android 10; SNE-LX1 Build/HUAWEISNE-L21; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/94.0.4606.71 Mobile Safari/537.36 hap/1079/huawei com.huawei.fastapp/11.4.1.310 com.frvr.worlds.quickapp/4.0.17 ({"packageName":"quickSearch","type":"other","extra":"{}"})'
        equal(isbot(ua), true);
        isbot.exclude([isbot.find(ua)])
        equal(isbot(ua), false);
      })
    })

    describe('isbot.spawn', () => {
      it('should spawn isbot with its own list', () => {
        const newUA = 'Mozilla/5.0 (Linux) NeoBrowser/93.0'
        const botUA = 'Mozilla/5.0 (compatible; SemrushBot-SA/0.97; +http://www.semrush.com/bot.html)'
        const isbot2 = isbot.spawn(['neobrowser'])
        assert(!isbot(newUA))
        assert(isbot2(newUA))
        assert(isbot(botUA))
        assert(!isbot2(botUA))
      })
      it('should not affect each others lists', () => {
        const newUA = 'Mozilla/5.0 (Linux) NeoBrowser/93.0'
        const isbot1 = isbot.spawn()
        const isbot2 = isbot.spawn()
        isbot1.extend(['neobrowser'])
        assert(isbot1(newUA))
        assert(!isbot2(newUA))
      })
      it('should spawn from instance\'s list', () => {
        const newUA = 'Mozilla/5.0 (Linux) NeoBrowser/93.0'
        const isbot1 = isbot.spawn()
        isbot1.extend(['neobrowser'])
        const isbot2 = isbot1.spawn()
        assert(isbot2(newUA))
      })
    })
  }
)
