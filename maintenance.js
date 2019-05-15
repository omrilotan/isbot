#!/usr/bin/env node

const { promises: { readFile, writeFile } } = require('fs');
const { join } = require('path');

['browsers', 'crawlers'].forEach(sort);

async function sort(file) {
	const filename = join(
		__dirname,
		`${file}.txt`
	);

	const buffer = await readFile(filename);
	const list = buffer.toString().split('\n');

	await writeFile(
		filename,

		// List without duplicates
		Array.from(new Set(list))

			// Remove empty lines
			.filter(Boolean)

			// Case insensitive sort
			.sort(
				(a, b) => a.toLowerCase().localeCompare(b.toLowerCase())
			)

			// Convert to list
			.join('\n')

			// Add one empty line at the end
			.concat('\n')
	);
}
