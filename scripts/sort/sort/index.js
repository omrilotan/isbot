/**
 * Case insensitive Sort
 * @param  {string} a
 * @param  {string} b
 * @returns {number}
 */
export function sort(a, b) {
	a = a.toLowerCase();
	b = b.toLowerCase();

	return a > b ? 1 : b > a ? -1 : 0;
}
