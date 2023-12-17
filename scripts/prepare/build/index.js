import { readdir, readFile } from "node:fs/promises";
import { join } from "path";
import { parse } from "yaml";

/**
 * Return the values of objects in our YAML lists
 * @param {string} path File path
 * @returns {string[]}
 */
const readFixturesYaml = async (path) =>
	Object.values(parse((await readFile(path)).toString())).flat();

/**
 * Build the lists of user agent strings
 * @param {string} fixturesDirectory
 * @param {string} downloadsDirectory
 * @returns {Promise<{browsers: string[], crawlers: string[]}>
 */
export async function build({ fixturesDirectory, downloadsDirectory }) {
	return {
		browsers: Array.from(new Set(await browsers({ fixturesDirectory }))).sort(),
		crawlers: Array.from(
			new Set(await crawlers({ fixturesDirectory, downloadsDirectory })),
		).sort(),
	};
}

/**
 * List of web browsers user agent strings
 * @param {string} fixturesDirectory
 * @returns {string[]}
 */
async function browsers({ fixturesDirectory }) {
	return await readFixturesYaml(join(fixturesDirectory, "browsers.yml"));
}

/**
 * List of known crawlers user agent strings
 * @param {string} fixturesDirectory
 * @param {string} downloadsDirectory
 * @returns {string[]}
 */
async function crawlers({ fixturesDirectory, downloadsDirectory }) {
	const crawlers = await readFixturesYaml(
		join(fixturesDirectory, "crawlers.yml"),
	);
	const browsersList = await browsers({ fixturesDirectory });
	const downloaded = [];
	for (const file of await readdir(downloadsDirectory)) {
		if (!file.endsWith(".json")) {
			continue;
		}
		try {
			const content = await readFile(join(downloadsDirectory, file));
			downloaded.push(...JSON.parse(content.toString()));
		} catch (error) {
			// Ignore
		}
	}
	return crawlers
		.concat(downloaded.flat())
		.filter((ua) => !ua.startsWith("#")) // Remove comments
		.filter(
			(ua = "") => !/ucweb|cubot/i.test(ua), // I don't know why it's in so many crawler lists
		)
		.filter((ua) => !browsersList.includes(ua)) // Remove browsers manually added to browsers.yml
		.filter((ua = "") => ua.length < 4e3); // Remove very long user agent strings
}
