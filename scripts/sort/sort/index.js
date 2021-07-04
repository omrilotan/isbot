const downcase = require('../downcase')

/**
 * Case insensitive Sort
 * @param  {string} a
 * @param  {string} b
 * @returns {number}
 */
module.exports = function sort (a, b) {
  a = downcase(a)
  b = downcase(b)

  return a > b ? 1 : b > a ? -1 : 0
}
