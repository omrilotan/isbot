const { join } = require('path')
const { parse } = require('yaml')
const client = require('../../lib/client')
const exists = require('../../lib/exists')
const write = require('../../lib/write')

const { log } = console

module.exports.download = ({ dir, force = false } = {}) => Promise.all([
  monperrus({ dir, force }),
  matomoOrg({ dir, force }),
  userAgentsNet({ dir, force }),
  myipMs({ dir, force })
])

/**
 * Read remote file and create JSON list locally
 * @param {string} [ø.dir='..'] Destination directory
 * @param {boolean} [ø.force] Read even if file exists
 * @returns {Promise<void>}
 */
async function monperrus ({ dir = join(__dirname, '..'), force = false } = {}) {
  const destination = join(dir, 'monperrus.json')
  if (!force && await exists(destination)) {
    log(`Skip ${destination} - Already exists.`)
    return 0
  }
  log(`Download content for ${destination}`)
  const response = await client({ url: 'https://raw.githubusercontent.com/monperrus/crawler-user-agents/master/crawler-user-agents.json' })
  const list = JSON.parse(response).map(
    ({ instances }) => instances
  ).flat()
  log(`Write ${destination}`)
  await write(destination, list)
  return 1
}

/**
 * Read remote file and create JSON list locally
 * @param {string} [ø.dir='..'] Destination directory
 * @param {boolean} [ø.force] Read even if file exists
 * @returns {Promise<void>}
 */
async function matomoOrg ({ dir = join(__dirname, '..'), force = false } = {}) {
  const destination = join(dir, 'matomo-org.json')
  if (!force && await exists(destination)) {
    log(`Skip ${destination} - Already exists.`)
    return 0
  }
  log(`Download content for ${destination}`)
  const response = await client({ url: 'https://raw.githubusercontent.com/matomo-org/device-detector/master/Tests/fixtures/bots.yml' })
  const list = parse(response).map(
    ({ user_agent }) => user_agent // eslint-disable-line camelcase
  )
  log(`Write ${destination}`)
  await write(destination, list)
  return 1
}

/**
 * Read remote file and create JSON list locally
 * @param {string} [ø.dir='..'] Destination directory
 * @param {boolean} [ø.force] Read even if file exists
 * @returns {Promise<void>}
 */
async function userAgentsNet ({ dir = join(__dirname, '..'), force = false } = {}) {
  const destination = join(dir, 'user-agents.net.json')
  if (!force && await exists(destination)) {
    log(`Skip ${destination} - Already exists.`)
    return 0
  }
  log(`Download content for ${destination}`)
  const response = await client(
    {
      url: 'https://user-agents.net/download',
      method: 'POST',
      data: {
        browser_type: 'bot-crawler',
        download: 'json'
      }
    }
  )
  const list = JSON.parse(response)
  log(`Write ${destination}`)
  await write(destination, list)
  return 1
}

/**
 * Read remote file and create JSON list locally
 * @param {string} [ø.dir='..'] Destination directory
 * @param {boolean} [ø.force] Read even if file exists
 * @returns {Promise<void>}
 */
async function myipMs ({ dir = join(__dirname, '..'), force = false } = {}) {
  const destination = join(dir, 'myip.ms.json')
  if (!force && await exists(destination)) {
    log(`Skip ${destination} - Already exists.`)
    return 0
  }
  log(`Download content for ${destination}`)
  const response = await client({ url: 'https://myip.ms/files/bots/live_webcrawlers.txt' })
  const list = response.split(
    '\n'
  ).map(
    line => line.split('records - ')[1]
  ).filter(
    Boolean
  )
  log(`Write ${destination}`)
  await write(destination, list)
  return 1
}
