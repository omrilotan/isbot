const { readFileSync } = require('fs')
const { join } = require('path')
const { parse } = require('yaml')
const UserAgent = require('user-agents')
require('array-flat-polyfill')

const crawlerUserAgentsText = '../fixtures/user-agents.net.bot-crawler.txt'
const crawlerUserAgentsJson = '../fixtures/crawler-user-agents-monperrus.json'
const crawlerUserAgentsYaml = '../fixtures/manual-crawlers-list.yml'
const browserUserAgentsYaml = '../fixtures/manual-legit-browsers.yml'

/**
 * List of known crawlers
 * @type {string[]}
 */
module.exports.crawlers = [

  // Read from text file
  ...readFileSync(
    join(
      __dirname,
      '../fixtures/',
      crawlerUserAgentsText
    ),
    'utf-8'
  ).trim().split('\n'),

  // Read from JSON file
  ...require(crawlerUserAgentsJson).reduce(
    (accumulator, { instances }) => accumulator.concat(instances),
    []
  ),

  // Read from Yaml file
  ...Object.values(
    parse(
      readFileSync(
        join(__dirname, crawlerUserAgentsYaml),
        'utf-8'
      )
    )
  ).flat()
]

const BOTS = new RegExp([
  'adbeat.com',
  'chrome-lighthouse',
  'googleweblight',
  'JavaFX',
  'phantomjs',
  'swurl',
  parseInt(process.versions.node) === 6 && 'cubot'
].filter(Boolean).join('|'), 'i')

/**
 * List of valid browser agents
 * @type {string[]}
 */
module.exports.browsers = [

  // Generate a random list of unique user agent strings
  ...Array.from(
    new Set(
      Array(1000)
        .fill()
        .map(
          () => new UserAgent(({ userAgent }) => !BOTS.test(userAgent)).toString()
        )
    )
  ),

  // Read from Yaml file
  ...Object.values(
    parse(
      readFileSync(
        join(__dirname, browserUserAgentsYaml),
        'utf-8'
      )
    )
  ).flat()
]

/**
 * Clean module files and reload
 */
module.exports.fresh = function () {
  delete require.cache[require.resolve('../..')]
  delete require.cache[require.resolve('../../list')]

  return require('../..')
}

/**
 * Represent a list as string
 * @param  {array} item
 * @return {string}
 */
module.exports.listings = list => list.map(item => ` - ${item}`).join('\n')
