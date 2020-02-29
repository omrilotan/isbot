var list = require('./list.json')
var regex

/**
 * Refresh the local regex variable (clusure)
 */
function update () {
  regex = new RegExp('(' + list.join('|') + ')', 'i')
}

/**
 * Check if string matches known crawler patterns
 * @param  {string} userAgent
 * @return {boolean}
 */
function isbot (userAgent) {
  return regex.test(userAgent)
}

/**
 * Get the match for strings' known crawler pattern
 * @param  {string} userAgent
 * @return {string}
 */
isbot.find = function (userAgent) {
  var match = userAgent.match(regex)
  return match && match[0]
}

/**
 * Extent patterns for known crawlers
 * @param  {array} additionalFilters
 * @return {void}
 */
isbot.extend = function (additionalFilters) {
  list = list.concat(
    additionalFilters.filter(included)
  )
  update()
  return isbot
}

/**
 * Check if item is included in list
 * @param  {string} rule
 * @return {boolean}
 */
function included (rule) {
  return list.indexOf(rule) === -1
}

/**
 * Exclude patterns from bot pattern rule
 * @param  {array} excludedFilters
 * @return {void}
 */
isbot.exclude = function (excludedFilters) {
  var i = excludedFilters.length
  while (i--) {
    var index = list.lastIndexOf(excludedFilters[i])
    if (index > -1) {
      list.splice(index, 1)
    }
  }
  update()
  return isbot
}

try {
  // Address: Cubot browser
  // Risk: Uses lookbehind assertion
  new RegExp('(?<! cu)bot').test('dangerbot')
  list.splice(list.lastIndexOf('bot'), 1)
  list.push('(?<! cu)bot')
} catch (error) {
  // ignore errors
}

update()

module.exports = isbot
