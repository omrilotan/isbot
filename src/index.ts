import patternsList from "./patterns.json";
import { fullPattern } from "./pattern.ts";

/**
 * Naive bot pattern.
 */
const naivePattern = /bot|crawl|http|lighthouse|scan|search|spider/i;

let pattern: RegExp;
export function getPattern(): RegExp {
	if (pattern instanceof RegExp) {
		return pattern;
	}
	try {
		// Build this RegExp dynamically to avoid syntax errors in older engines.
		pattern = new RegExp(fullPattern, "i");
	} catch (error) {
		pattern = naivePattern;
	}
	return pattern;
}

const isNonEmptyString = (value: unknown): value is string =>
	typeof value === "string" && value !== "";

/**
 * A list of bot identifiers to be used in a regular expression against user agent strings.
 */
export const list: string[] = patternsList;

/**
 * Check if the given user agent includes a bot pattern.
 */
export function isbot(userAgent?: string | null): boolean {
	return isNonEmptyString(userAgent) && getPattern().test(userAgent);
}

/**
 * Check if the given user agent includes a bot pattern. Naive implementation (less accurate).
 */
export const isbotNaive: typeof isbot = (userAgent) =>
	isNonEmptyString(userAgent) && naivePattern.test(userAgent);

/**
 * Create a custom isbot function with a custom pattern.
 */
export const createIsbot: (customPattern: RegExp) => typeof isbot =
	(customPattern) => (userAgent) =>
		isNonEmptyString(userAgent) && customPattern.test(userAgent);

/**
 * Create a custom isbot function with a custom pattern.
 */
export const createIsbotFromList = (list: string[]): typeof isbot => {
	const pattern = new RegExp(list.join("|"), "i");
	return (userAgent) => isNonEmptyString(userAgent) && pattern.test(userAgent);
};

/**
 * Find the first part of the user agent that matches a bot pattern.
 */
export const isbotMatch = (
	userAgent: Parameters<typeof isbot>[0],
): string | null => userAgent?.match(getPattern())?.[0] ?? null;

/**
 * Find all parts of the user agent that match a bot pattern.
 */
export const isbotMatches = (
	userAgent: Parameters<typeof isbot>[0],
): string[] =>
	list
		.map((part) => userAgent?.match(new RegExp(part, "i"))?.[0])
		.filter(isNonEmptyString);

/**
 * Find the first bot pattern that match the given user agent.
 */
export const isbotPattern = (
	userAgent: Parameters<typeof isbot>[0],
): string | null =>
	userAgent
		? (list.find((pattern) => new RegExp(pattern, "i").test(userAgent)) ?? null)
		: null;

/**
 * Find all bot patterns that match the given user agent.
 */
export const isbotPatterns = (
	userAgent: Parameters<typeof isbot>[0],
): string[] =>
	userAgent
		? list.filter((pattern) => new RegExp(pattern, "i").test(userAgent))
		: [];
