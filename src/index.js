import list from './list.json'
import { amend } from './amend/index.js'

amend(list)
const pattern = new RegExp(list.join('|'), 'i')

/**
 * Check if string matches known crawler patterns
 * @param  {string} ua User Agent String
 * @return {boolean}
 */
export default ua => pattern.test(ua)
