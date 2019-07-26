const { promises: { readFile, writeFile } } = require('fs');
const { join } = require('path');

/**
 * Create array without the duplicates
 * @param  {Array} list
 * @return {Array}
 */
const dedup = list => Array.from(new Set(list));

(async() => {
	sortTextFile('../crawlers.txt');
	sortTextFile('../browsers.txt');
	sortJSON('../list.json');
})();

/**
 * Case insensitive Sort
 * @param  {String} a
 * @param  {String} b
 * @return {Number}
 */
function sort(a, b) {
	a = a.toLowerCase();
	b = b.toLowerCase();

	return a > b ? 1 : b > a ? -1 : 0;
}

/**
 * Read, sort, and save JSON file
 * @param  {String} filename
 * @return {undefined}
 */
async function sortJSON(filename) {
	const filepath = join(__dirname, filename);
	const list = require(`../${filename}`);

	await writeFile(
		filepath,
		JSON.stringify(
			dedup(list).sort(sort),
			null,
			2
		)
	);
}

/**
 * Read, sort, and save plain text file
 * @param  {String} filename
 * @return {undefined}
 */
async function sortTextFile(filename) {
	const filepath = join(__dirname, `../${filename}`);
	const crawlers = await readFile(filepath);
	const list = crawlers.toString()
		.trim()
		.split('\n')
		.filter(Boolean)
		.map(s => s.trim())
		.sort(sort);

	await writeFile(filepath, dedup(list).join('\n'));
}

