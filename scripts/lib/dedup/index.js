/**
 * Create array without the duplicates
 * @param  {Array} list
 * @return {Array}
 */
module.exports = list => Array.from(new Set(list))
