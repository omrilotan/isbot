/* eslint-env mocha */

import isbotDefault, { isbot } from 'isbot'

const BROWSER_UA = 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X; en-US) AppleWebKit/533.4 (KHTML, like Gecko) Chrome/5.0.375.86 Safari/533.4'
const CRAWLER_UA = 'Mozilla/3.0 (compatible; Web Link Validator 2.x)Web Link Validator http://www.relsoftware.com/ link validation software'

describe('browser', () => {
  describe('Sanity test in browser', () => {
    it('should return false for a browser', () => {
      if (isbot(BROWSER_UA) !== false) {
        throw new Error(`Sould have passed browser "${BROWSER_UA}"`)
      }
      if (isbotDefault(BROWSER_UA) !== false) {
        throw new Error(`Sould have passed browser "${BROWSER_UA}"`)
      }
    })
    it('should return true for a known crawler', () => {
      if (isbot(CRAWLER_UA) !== true) {
        throw new Error(`Sould have failed crawler "${CRAWLER_UA}"`)
      }
      if (isbotDefault(CRAWLER_UA) !== true) {
        throw new Error(`Sould have failed crawler "${CRAWLER_UA}"`)
      }
    })
  })
})
