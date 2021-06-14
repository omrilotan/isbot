const { readFileSync } = require('fs')
const { join } = require('path')
const { parse } = require('yaml')
const UserAgent = require('user-agents')
require('array-flat-polyfill')

const crawlerUserAgentsText = '../fixtures/user-agents.net.bot-crawler.txt'
const botsIgnoreList = '../fixtures/user-agents.net-bots-ignore-list.txt'
const liveWebcrawlers = '../fixtures/live_webcrawlers.txt'
const crawlerUserAgentsJson = '../fixtures/crawler-user-agents-monperrus.json'
const crawlerUserAgentsYaml = '../fixtures/manual-crawlers-list.yml'
const legitBrowserUserAgentsYaml = '../fixtures/manual-legit-browsers.yml'
const matomoBotsYaml = '../fixtures/matomo-bots.yml'

const read = file => readFileSync(
  join(__dirname, file),
  'utf-8'
)

const legitBrowserUserAgents = Object.values(
  parse(
    read(
      legitBrowserUserAgentsYaml
    )
  )
).flat()

const ignoreList = read(botsIgnoreList)
  .trim()
  .split('\n')
  .filter(
    line => !line.startsWith('#')
  )
  .concat(legitBrowserUserAgents)

/**
 * For some reason, UCWEB are all considered bots by these guys
 * @type RegExp
 */
const NOT_REALLY_CRAWLERS_PATTERN = new RegExp([
  'ucmini',
  'splash',
  '^radiosnet',
  '^NokiaC2',
  '^NokiaC3',
  '^NokiaX2',
  '^Mozilla\\/5\\.0 \\(Windows; rv:\\d{2}\\.0\\) Gecko/20100101 Firefox\\/\\d{2}\\.0$',
  'ArchiveBox'
].join('|'), 'i')

/**
 * List of known crawlers
 * @type {string[]}
 */
module.exports.crawlers = [

  // Read from text file
  ...read(crawlerUserAgentsText).trim().split('\n').filter(
    line => !NOT_REALLY_CRAWLERS_PATTERN.test(line)
  ),

  // Read from a different text file
  ...read(
    liveWebcrawlers
  ).split('\n').map(
    line => line.split('records - ')[1]
  ).filter(
    Boolean
  ).filter(
    line => !line.includes('CUBOT') // Lots of unrecognisable CUBOT user agent strings in this list
  ),

  // Read from JSON file
  ...require(crawlerUserAgentsJson).reduce(
    (accumulator, { instances }) => accumulator.concat(instances),
    []
  ),

  // Read from Yaml file
  ...Object.values(
    parse(
      read(
        crawlerUserAgentsYaml
      )
    )
  ).flat(),

  // Matomo list
  ...parse(
    read(
      matomoBotsYaml
    )
  ).map(
    ({ user_agent }) => user_agent // eslint-disable-line camelcase
  )

].filter(Boolean).filter(ua => !ignoreList.includes(ua))

const BOTS = new RegExp([
  'adbeat.com',
  'chrome-lighthouse',
  'googleweblight',
  'JavaFX',
  'phantomjs',
  'swurl',
  'Hexometer',
  'BuiltWith',
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
  ...legitBrowserUserAgents
].filter(Boolean)

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
