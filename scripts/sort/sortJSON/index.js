const { promises: { writeFile } } = require('fs')
const dedup = require('../dedup')
const sort = require('../sort')

/**
 * Read, sort, and save JSON file
 * @param  {string} filepath
 * @returns {Promise<void>}
 */
module.exports = async function sortJSON (filepath) {
  const list = require(filepath)

  await writeFile(
    filepath,
    JSON.stringify(
      dedup(list).sort(sort),
      null,
      2
    ) + '\n'
  )
}
