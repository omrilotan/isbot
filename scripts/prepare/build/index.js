const { promises: { readdir, readFile } } = require('fs')
const { join } = require('path')
const { parse } = require('yaml')
const UserAgent = require('user-agents')
const dedup = require('../../lib/dedup')

module.exports = async function build ({ fixturesDirectory, downloadsDirectory }) {
  return {
    browsers: dedup(await browsers({ fixturesDirectory, downloadsDirectory })),
    crawlers: dedup(await crawlers({ fixturesDirectory, downloadsDirectory }))
  }
}

/**
 * List of web browsers user agent strings
 * @returns {string[]}
 */
async function browsers ({ fixturesDirectory, downloadsDirectory }) {
  const browsers = await readYaml(join(fixturesDirectory, 'browsers.yml'))

  const list = await crawlers({ fixturesDirectory, downloadsDirectory })

  // Generate a random list of unique user agent strings
  const random = Array(1000)
    .fill()
    .map(
      () => new UserAgent(
        ({ ua }) => ua !== list
      )
    )

  return browsers.concat(random)
}

/**
 * List of known crawlers user agent strings
 * @returns {string[]}
 */
async function crawlers ({ fixturesDirectory, downloadsDirectory }) {
  const crawlers = await readYaml(join(fixturesDirectory, 'crawlers.yml'))
  const browsers = await readYaml(join(fixturesDirectory, 'browsers.yml'))
  const downloadedFiles = await readdir(downloadsDirectory)
  const downloaded = downloadedFiles.filter(
    file => file.endsWith('.json')
  ).map(
    file => require(join(downloadsDirectory, file))
  ).flat()

  return crawlers.concat(downloaded).filter(
    ua => !ua.startsWith('#')
  ).filter(
    ua => !/ucweb|cubot/i.test(ua) // I don't know why it's in so many crawler lists
  ).filter(
    ua => !browsers.includes(ua)
  ).filter(
    ua => ua.length < 4e3
  )
}

/**
 * Return the values of objects in our YAML lists
 * @param {string} path File path
 * @returns {string[]}
 */
async function readYaml (path) {
  const content = await readFile(path)
  return Object.values(
    parse(
      content.toString()
    )
  ).flat()
}
