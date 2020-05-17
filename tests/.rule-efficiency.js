const { parentPort } = require('worker_threads');
const { crawlers, fresh } = require('./helpers')

parentPort.once(
  'message',
  rules => parentPort.postMessage(
    checkRule(
      JSON.parse(rules)
    )
  )
);

/**
 * Check if rule is necessary
 * @param {string[]}
 * @return {JSON<string[]>} Error messages
 */
function checkRule(rules) {
  const errors = []

  errors.push(
    ...rules.map(
      rule => {
        const isbot = fresh()

        isbot.exclude([rule])

        // Check if there's a crawler user agent that requires this rule
        if (crawlers.every(isbot)) {
          return `Removing rule "${rule}" did not result in missing any listed crawler. It is redundant`
        }

        // Check if a rule can be more efficient
        if (!rule.startsWith('^')) {
          isbot.extend([`^${rule}`])

          if (crawlers.every(isbot)) {
            return `Rule "${rule}" should start with "^"`
          }
        }

        return null
      }
    ).filter(Boolean)
  )


  return JSON.stringify(errors)

}
