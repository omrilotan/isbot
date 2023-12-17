#!/usr/bin/env node

import { writeFile } from "node:fs/promises";

/**
 * sortBy Sort a list of objects by the value of a key
 * @param {object[]} list
 * @param {string} key
 * @returns {object[]}
 */
const sortBy = (list, key) =>
	list.sort(function (a, b) {
		const [_a, _b] = [a, b].map((i) => i[key]);
		if (_a < _b) return 1;
		if (_a > _b) return -1;
		return 0;
	});

start();

async function start() {
	const response = await fetch(
		"https://api.github.com/repos/omrilotan/isbot/contributors",
		{
			headers: new Headers([
				["Content-Type", "application/json"],
				["User-Agent", "omrilotan/isbot"],
			]),
		},
	);
	const contributors = sortBy(await response.json(), "contributions")
		.map(({ login, html_url: url }) => `${login} (${url})`)
		.join("\n");

	await writeFile("AUTHORS", contributors);
}
