import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { parse } from "yaml";
import { exists } from "../../lib/exists/index.js";

const { log } = console;

export const download = ({ dir, force = false } = {}) =>
	Promise.all([
		monperrus({ dir, force }),
		matomoOrg({ dir, force }),
		userAgentsNet({ dir, force }),
		myipMs({ dir, force }),
	]);

/**
 * Read remote file and create JSON list locally
 * @param {string} [ø.dir='..'] Destination directory
 * @param {boolean} [ø.force] Read even if file exists
 * @returns {Promise<void>}
 */
async function monperrus({ dir = join(__dirname, ".."), force = false } = {}) {
	const destination = join(dir, "monperrus.json");
	if (!force && (await exists(destination))) {
		log(`Skip ${destination} - Already exists.`);
		return 0;
	}
	log(`Download content for ${destination}`);
	const response = await fetch(
		"https://raw.githubusercontent.com/monperrus/crawler-user-agents/master/crawler-user-agents.json",
	);
	const list = (await response.json()).map(({ instances }) => instances).flat();
	log(`Write ${destination}`);
	await writeFile(destination, JSON.stringify(list, null, 2) + "\n");
	return 1;
}

/**
 * Read remote file and create JSON list locally
 * @param {string} [ø.dir='..'] Destination directory
 * @param {boolean} [ø.force] Read even if file exists
 * @returns {Promise<void>}
 */
async function matomoOrg({ dir = join(__dirname, ".."), force = false } = {}) {
	const destination = join(dir, "matomo-org.json");
	if (!force && (await exists(destination))) {
		log(`Skip ${destination} - Already exists.`);
		return 0;
	}
	log(`Download content for ${destination}`);
	const response = await fetch(
		"https://raw.githubusercontent.com/matomo-org/device-detector/master/Tests/fixtures/bots.yml",
	);
	const list = parse(await response.text()).map(
		({ user_agent }) => user_agent, // eslint-disable-line camelcase
	);
	log(`Write ${destination}`);
	await writeFile(destination, JSON.stringify(list, null, 2) + "\n");
	return 1;
}

/**
 * Read remote file and create JSON list locally
 * @param {string} [ø.dir='..'] Destination directory
 * @param {boolean} [ø.force] Read even if file exists
 * @returns {Promise<void>}
 */
async function userAgentsNet({
	dir = join(__dirname, ".."),
	force = false,
} = {}) {
	const destination = join(dir, "user-agents.net.json");
	if (!force && (await exists(destination))) {
		log(`Skip ${destination} - Already exists.`);
		return 0;
	}
	log(`Download content for ${destination}`);
	const response = await fetch("https://user-agents.net/download", {
		method: "POST",
		body: [
			["browser_type", "bot-crawler"],
			["download", "json"],
		]
			.map((entry) => entry.join("="))
			.join("&"),
		headers: new Headers([
			["Content-Type", "application/x-www-form-urlencoded"],
			["User-Agent", "omrilotan/isbot"],
		]),
	});
	const list = await response.json();
	log(`Write ${destination}`);
	await writeFile(destination, JSON.stringify(list, null, 2) + "\n");
	return 1;
}

/**
 * Read remote file and create JSON list locally
 * @param {string} [ø.dir='..'] Destination directory
 * @param {boolean} [ø.force] Read even if file exists
 * @returns {Promise<void>}
 */
async function myipMs({ dir = join(__dirname, ".."), force = false } = {}) {
	const destination = join(dir, "myip.ms.json");
	if (!force && (await exists(destination))) {
		log(`Skip ${destination} - Already exists.`);
		return 0;
	}
	log(`Download content for ${destination}`);
	const response = await fetch(
		"https://myip.ms/files/bots/live_webcrawlers.txt",
	);
	const list = (await response.text())
		.split("\n")
		.map((line) => line.split("records - ")[1])
		.filter(Boolean);
	log(`Write ${destination}`);
	await writeFile(destination, JSON.stringify(list, null, 2) + "\n");
	return 1;
}
