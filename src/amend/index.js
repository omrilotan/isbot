/**
 * Mutate given list of patter strings
 * @param {string[]} list
 * @returns {string[]}
 */
export function amend (list) {
  try {
    // Risk: Uses lookbehind assertion, avoid breakage in parsing by using RegExp constructor
    new RegExp('(?<! cu)bot').test('dangerbot') // eslint-disable-line prefer-regex-literals
  } catch (error) {
    // Skip regex fixes
    return list
  }

  // Addresses: Cubot device
  list.splice(list.lastIndexOf('bot'), 1)
  list.push('(?<! cu)bot')
  // Addresses: Android webview
  list.splice(list.lastIndexOf('google'), 1)
  list.push('(?<! (channel\\/|google\\/))google(?!(app|\\/google))')

  // Addresses: Yandex browser
  list.splice(list.lastIndexOf('search'), 1)
  list.push('(?<! (ya|yandex))search')
  // Addresses: libhttp browser
  list.splice(list.lastIndexOf('http'), 1)
  list.push('(?<!(lib))http')
  // Addresses: java based browsers
  list.splice(list.lastIndexOf('java'), 1)
  list.push('java(?!;)')
  // Addresses: Mozilla nightly build https://github.com/mozilla-mobile/android-components/search?q=MozacFetch
  list.splice(list.lastIndexOf('fetch'), 1)
  list.push('(?<!(mozac))fetch')

  return list
}
