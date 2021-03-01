var list = require('./list.json')
var regex

/**
 * Refresh the local regex variable (clusure)
 */
function update () {
  regex = new RegExp(list.join('|'), 'i')
}

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
  [].push.apply(list, additionalFilters.filter(included))
  update()
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
module.exports.exclude = function (excludedFilters) {
  var i = excludedFilters.length
  while (i--) {
    var index = list.lastIndexOf(excludedFilters[i].toLowerCase())
    if (index > -1) {
      list.splice(index, 1)
    }
  }
  update()
}

try {
  // Risk: Uses lookbehind assertion
  new RegExp('(?<! cu)bot').test('dangerbot')
  // Addresses: Cubot device
  list.splice(list.lastIndexOf('bot'), 1)
  list.push('(?<! cu)bot')
  // Addresses: Android webview
  list.splice(list.lastIndexOf('google'), 1)
  list.push('(?<! channel\\/)google(?!app\\/)')
  // Addresses: Yandex browser
  list.splice(list.lastIndexOf('search'), 1)
  list.push('(?<! (ya|yandex))search')
  // Addresses: libhttp browser
  list.splice(list.lastIndexOf('http'), 1)
  list.push('(?<!(lib))http')
  // Addresses: java based browsers
  list.splice(list.lastIndexOf('java'), 1)
  list.push('java(?!;)')
  // Addresses: java based browsers
  list.splice(list.lastIndexOf('fetch'), 1)
  list.push('(?<!(mozac))fetch')
} catch (error) {
  // ignore errors
}

update()
