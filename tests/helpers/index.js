const { readFileSync } = require('fs')
const { join } = require('path')

/**
 * Clean module files
 */
module.exports.cleanup = function () {
  delete require.cache[require.resolve('../..')]
  delete require.cache[require.resolve('../../list')]
}

/**
 * Get the file contents of a fixture
 * @param  {string} filename
 * @return {string}
 */
module.exports.fixture = function fixture (filename) {
  const file = join(__dirname, '../fixtures/', filename)
  return readFileSync(file, 'utf-8').trim()
}

/**
 * Represent a list as string
 * @param  {array} item
 * @return {string}
 */
exports.listings = list => list.map(item => ` - ${item}`).join('\n')
