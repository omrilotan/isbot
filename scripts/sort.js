const { promises: { readFile, writeFile } } = require('fs');
const { join } = require('path');
const dedup = list => Array.from(new Set(list));
function sort(a, b) {
	a = a.toLowerCase();
	b = b.toLowerCase();

	return a > b ? 1 : b > a ? -1 : 0;
}

(async() => {
	sortTextFile('crawlers.txt');
	sortTextFile('browsers.txt');
	sortJSON('list.json');
})();


async function sortJSON(filename) {
	const filepath = join(__dirname, `../${filename}`);
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

