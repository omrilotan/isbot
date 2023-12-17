import { readFile, writeFile } from "node:fs/promises";
import YAML from "yaml";
import { sort } from "../sort/index.js";

/**
 * Read, sort, and save Yaml file
 * @param  {String} filepath
 * @return {Promise<void>}
 */
export async function sortYamlFile(filepath) {
	const data = YAML.parse((await readFile(filepath)).toString());

	const sorted = Object.fromEntries(
		Object.entries(
			data,

			// Sort keys
		)
			.sort(
				([_a], [_b]) => {
					const [a, b] = [_a, _b].map((i) => i.toLowerCase());

					return a > b ? 1 : a < b ? -1 : 0;
				},

				// Remove duplicates and sort lists
			)
			.map(([k, v]) => [k, Array.from(new Set(v)).sort(sort)]),
	);

	await writeFile(
		filepath,
		YAML.stringify(sorted, undefined, { lineWidth: Infinity }),
	);
}
