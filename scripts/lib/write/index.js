const { promises: { writeFile } } = require('fs')

/**
 * Write JSON file
 * @param {string} path
 * @param {any} content
 * @param {boolean} [stringify=true]
 * @returns {Promise<void>}
 */
module.exports = (destination, content, { stringify = true } = {}) => writeFile(
  destination,
  stringify
    ? JSON.stringify(content, null, 2) + '\n'
    : content.toString()
)
