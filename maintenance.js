#!/usr/bin/env node

const { promises: { readFile, writeFile } } = require('fs');
const { join } = require('path');

// Case insensitive sort
const sort = (a, b) => a.toLowerCase().localeCompare(b.toLowerCase());

// Sort text files
['browsers', 'crawlers'].forEach(sortTextFile);

// Sort rules list
const json = join(__dirname, 'list.json');
const list = require(json);

writeFile(
  json,
  JSON.stringify(
    Array.from(new Set(list)).sort(sort),
    null,
    4
  )
);


async function sortTextFile(file) {
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

      // Remove wrapping white spaces
      .map(line => line.trim())

      // Case insensitive sort
      .sort(sort)

      // Convert to list
      .join('\n')

      // Add one empty line at the end
      .concat('\n')
  );
}
