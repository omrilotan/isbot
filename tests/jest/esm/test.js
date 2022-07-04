/* eslint-env jest */

import isbot from 'isbot'

describe('jest test', () => {
  test('should pass', () => {
    expect(isbot('Pingdom.com_bot_version_1.4_(http://www.pingdom.com/)')).toBeTruthy()
  })
})
