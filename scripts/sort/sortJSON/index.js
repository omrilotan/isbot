import { readFile, writeFile } from "node:fs/promises";
import { sort } from "../sort/index.js";

/**
 * Read, sort, and save JSON file
 * @param  {string} filepath
 * @returns {Promise<void>}
 */
export async function sortJSON(filepath) {
	const list = JSON.parse((await readFile(filepath)).toString());
	await writeFile(
		filepath,
		JSON.stringify(Array.from(new Set(list)).sort(sort), null, 2) + "\n",
	);
}
