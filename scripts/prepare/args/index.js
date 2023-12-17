/**
 * Determine what argument options were passed
 * @param {string[]} ø.argv
 * @returns {object<string, any>}
 */
export function args({ argv }) {
	const force = argv.includes("-f") || argv.includes("--force");

	return { force };
}
