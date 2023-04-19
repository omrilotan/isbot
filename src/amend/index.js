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

  [
    // Addresses: Cubot device
    ['bot', '(?<! cu)bot'],
    // Addresses: Android webview
    ['google', '(?<! (?:channel/|google/))google(?!(app|/google| pixel))'],
    // Addresses: libhttp browser
    ['http', '(?<!(?:lib))http'],
    // Addresses: java based browsers
    ['java', 'java(?!;)'],
    // Addresses: Yandex Search App
    ['search', '(?<! ya(?:yandex)?)search']
  ].forEach(
    ([search, replace]) => {
      const index = list.lastIndexOf(search)
      if (~index) {
        list.splice(index, 1, replace)
      }
    }
  )

  return list
}
