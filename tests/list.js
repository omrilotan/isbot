/* eslint-env mocha */

const list = require('../list.json')

describe('list', () => {
  it('should all be lowercase', () => {
    list.forEach(item => {
      if (item !== item.toLowerCase()) {
        throw new Error(`${item} is not in lowercase. Pattern is case insensitive, please convert to lowercase`)
      }
    })
  })
})
