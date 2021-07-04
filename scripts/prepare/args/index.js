/**
 * Determine what argument options were passed
 * @param {string[]} ø.argv
 * @returns {object<string, any>}
 */
module.exports = function args ({ argv }) {
  const force = argv.includes('-f') || argv.includes('--force')

  return { force }
}
