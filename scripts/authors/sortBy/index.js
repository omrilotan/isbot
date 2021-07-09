/**
 * sortBy Sort a list of objects by the value of a key
 * @param {object[]} list
 * @param {string} key
 * @returns {object[]}
 */
module.exports = (list, key) => list.sort(
  function (a, b) {
    const [_a, _b] = [a, b].map(i => i[key])
    if (_a < _b) return 1
    if (_a > _b) return -1
    return 0
  }
)
