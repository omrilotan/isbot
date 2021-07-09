/**
 * Create array without the duplicates
 * @param  {any[]} list
 * @return {any[]}
 */
module.exports = list => Array.from(new Set(list))
