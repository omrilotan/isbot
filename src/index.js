import list from './list.json'
import { amend } from './amend/index.js'

amend(list)
let pattern

/**
 * Refresh the local regex variable (clusure)
 */
function update () {
  pattern = new RegExp(list.join('|'), 'i')
}

/**
 * Check if string matches known crawler patterns
 * @param  {string} ua User Agent String
 * @return {boolean}
 */
const isbot = ua => pattern.test(ua)

/**
 * Get the match for strings' known crawler pattern
 * @param  {string} ua
 * @return {string}
 */
function find (ua) {
  const match = ua.match(pattern)
  return match && match[0]
}

/**
 * Find the first index of an existing rule or -1 if not found
 * @param  {string} rule
 * @returns {number}
 */
const indexOf = (rule) => list.indexOf(rule.toLowerCase())

/**
 * Check if item is included in list
 * @param  {string} rule
 * @return {boolean}
 */
const included = (rule) => indexOf(rule) === -1

/**
 * Extent patterns for known crawlers
 * @param  {string[]} filters
 * @return {void}
 */
function extend (filters) {
  [].push.apply(
    list,
    filters.filter(included).map(filter => filter.toLowerCase())
  )
  update()
}

/**
 * Exclude patterns from bot pattern rule
 * @param  {string[]} filters
 * @return {void}
 */
function exclude (filters) {
  let { length } = filters
  while (length--) {
    const index = indexOf(filters[length])
    if (index > -1) {
      list.splice(index, 1)
    }
  }
  update()
}

Object.defineProperties(
  isbot,
  {
    find: { get: () => find },
    extend: { get: () => extend },
    exclude: { get: () => exclude }
  }
)

update()

export default isbot
