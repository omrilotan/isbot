const { promises: { stat } } = require('fs')

/**
 * @param {string} path Path to file
 * @returns {boolean}
 */
module.exports = async function exists (path) {
  try {
    const stats = await stat(path)
    return stats.isFile() || stats.isSymbolicLink() || stats.isDirectory()
  } catch (error) {
    return false
  }
}
