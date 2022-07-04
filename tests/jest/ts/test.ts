/* eslint-env jest */

import isbot from 'isbot'
import { strict as assert } from 'assert'

describe('jest test', (): void => {
  test('should pass', (): void => {
    assert(isbot('Pingdom.com_bot_version_1.4_(http://www.pingdom.com/)'))
  })
})
