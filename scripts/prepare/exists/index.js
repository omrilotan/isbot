import { stat } from "node:fs/promises";

/**
 * @param {string} path Path to file
 * @returns {boolean}
 */
export async function exists(path) {
	try {
		const stats = await stat(path);
		return stats.isFile() || stats.isSymbolicLink() || stats.isDirectory();
	} catch (error) {
		return false;
	}
}
