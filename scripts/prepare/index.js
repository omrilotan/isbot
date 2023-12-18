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
	const downloadsDirectory = join(fixturesDirectory, "downloads");

	await mkdir(downloadsDirectory, { recursive: true });
	const results = await download({ dir: downloadsDirectory, force });
	const news = results.reduce((a, b) => a + b);
	if (news) {
		log("Create new timestamp");
		await writeFile(
			join(downloadsDirectory, "downloaded"),
			new Date().toUTCString(),
		);
	} else {
		log("No new files were downloaded");
	}

	log("Create fixtures JSON");
	const { browsers, crawlers } = await build({
		fixturesDirectory,
		downloadsDirectory,
	});
	await writeFile(
		join(fixturesDirectory, "index.json"),
		JSON.stringify({ browsers, crawlers }, null, 2) + "\n",
	);
}
