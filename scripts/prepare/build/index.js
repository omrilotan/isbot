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

  const knownCrawlers = await crawlers({ fixturesDirectory, downloadsDirectory })

  // Generate a random list of unique user agent strings
  const random = Array(2000)
    .fill()
    .map(
      () => new UserAgent()
    )
    .map(
      wrap(({ data: { userAgent: ua } }) => ua)
    )
    .filter(
      wrap(ua => !knownCrawlers.includes(ua))
    )
    .filter(
      Boolean
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
    wrap(file => file.endsWith('.json'))
  ).map(
    wrap(file => require(join(downloadsDirectory, file)))
  ).flat()

  return crawlers.concat(downloaded).filter(
    wrap(ua => !ua.startsWith('#'))
  ).filter(
    wrap(ua => !/ucweb|cubot/i.test(ua)) // I don't know why it's in so many crawler lists
  ).filter(
    wrap(ua => !browsers.includes(ua))
  ).filter(
    wrap(ua => ua.length < 4e3)
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

/**
 * Wrap a filter function to add arguments to error messages
 * @param {Function} fn
 * @returns {Function}
 */
function wrap (fn) {
  return function () {
    try {
      return fn.apply(this, arguments)
    } catch (error) {
      error.message = [error.message, stringify(arguments)].join(': ')
      throw error
    }
  }
}

/**
 * Stringify an array of arguments
 * @param {any[]} array
 * @returns
 */
function stringify (array) {
  try {
    return JSON.stringify(array).substring(0, 100)
  } catch (error) {
    return array.map(item => `${item}`).join(', ').substring(0, 100)
  }
}
