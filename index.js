var list = require('./list.json')
var regex

/**
 * Refresh the local regex variable (clusure)
 */
function update () {
  regex = new RegExp('(' + list.join('|') + ')', 'i')
}
update()

/**
 * Check if string matches known crawler patterns
 * @param  {string} userAgent
 * @return {boolean}
 */
module.exports = function (userAgent) {
  return regex.test(userAgent)
}

/**
 * Get the match for strings' known crawler pattern
 * @param  {string} userAgent
 * @return {string}
 */
module.exports.find = function (userAgent) {
  var match = userAgent.match(regex)
  return match && match[0]
}

/**
 * Extent patterns for known crawlers
 * @param  {array} additionalFilters
 * @return {void}
 */
module.exports.extend = function (additionalFilters) {
  list = list.concat(additionalFilters)
  update()
}

/**
 * Exclude patterns from bot pattern rule
 * @param  {array} excludedFilters
 * @return {void}
 */
module.exports.exclude = function (excludedFilters) {
  var i = excludedFilters.length
  while (i--) {
    var index = list.lastIndexOf(excludedFilters[i])
    if (index > -1) {
      list.splice(index, 1)
    }
  }
  update()
}
