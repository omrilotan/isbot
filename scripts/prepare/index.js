#!/usr/bin/env node

import { mkdir, writeFile } from "node:fs/promises";
import { join } from "path";
import { args } from "./args/index.js";
import { build } from "./build/index.js";
import { download } from "./externals/index.js";

const { log } = console;

/**
 * scripts/prepare.js [-f] [--force]
 */
start(process);

/**
 * Run this script
 * @paran {string[]} ø.argv
 * @returns {void}
 */
async function start({ argv }) {
	const { force } = args({ argv });
	const fixturesDirectory = join("fixtures");
	const downloadedDirectory = join(fixturesDirectory, "downloaded");

	await mkdir(downloadedDirectory, { recursive: true });
	const results = await download({ dir: downloadedDirectory, force });
	const news = results.reduce((a, b) => a + b);
	switch (news) {
		case 0:
			log("No new files were downloaded");
			break;
		case results.length:
			log("All files were downloaded");
			log("Create new timestamp");
			await writeFile(join(dir, "downloaded"), new Date().toUTCString());
			break;
		default:
			log(`Some files were downloaded (${news}/${results.length})`);
			break;
	}

	log("Create fixtures JSON");
	const { browsers, crawlers } = await build({
		fixturesDirectory,
		downloadedDirectory,
	});
	await writeFile(
		join(fixturesDirectory, "index.json"),
		JSON.stringify({ browsers, crawlers }, null, 2) + "\n",
	);
}
