const { promises: { readFile, writeFile } } = require('fs')
const YAML = require('yaml')
const dedup = require('../dedup')
const downcase = require('../downcase')
const sort = require('../sort')

/**
 * Read, sort, and save Yaml file
 * @param  {String} filepath
 * @return {Promise<void>}
 */
module.exports = async function sortYamlFile (filepath) {
  const content = (await readFile(filepath)).toString()
  const data = YAML.parse(content)

  const sorted = Object.fromEntries(
    Object.entries(
      data

    // Sort keys
    ).sort(
      ([_a], [_b]) => {
        const [a, b] = [_a, _b].map(downcase)

        return a > b ? 1 : a < b ? -1 : 0
      }

    // Remove duplicates and sort lists
    ).map(
      ([k, v]) => [k, dedup(v).sort(sort)]
    )
  )

  YAML.scalarOptions.str.fold.lineWidth = Infinity

  await writeFile(
    filepath,
    YAML.stringify(sorted)
  )
}
