import { regex } from "./pattern";
import patternsList from "./patterns.json";

// Workaround for TypeScript's type definition of imported variables and JSON files.

/**
 * A pattern that matches bot identifiers in user agent strings.
 */
export const pattern: RegExp = regex;

/**
 * A list of bot identifiers to be used in a regular expression against user agent strings.
 */
export const list: string[] = patternsList;

/**
 * Check if the given user agent includes a bot pattern.
 */
export const isbot = (userAgent: string): boolean =>
	Boolean(userAgent) && pattern.test(userAgent);

/**
 * Create a custom isbot function with a custom pattern.
 */
export const createIsbot =
	(customPattern: RegExp): ((userAgent: string) => boolean) =>
	(userAgent: string): boolean =>
		Boolean(userAgent) && customPattern.test(userAgent);

/**
 * Create a custom isbot function with a custom pattern.
 */
export const createIsbotFromList = (
	list: string[],
): ((userAgent: string) => boolean) => {
	const pattern = new RegExp(list.join("|"), "i");
	return (userAgent: string): boolean =>
		Boolean(userAgent) && pattern.test(userAgent);
};

/**
 * Find the first part of the user agent that matches a bot pattern.
 */
export const isbotMatch = (userAgent: string): string | null =>
	userAgent.match(pattern)?.[0];

/**
 * Find all parts of the user agent that match a bot pattern.
 */
export const isbotMatches = (userAgent: string): string[] =>
	list
		.map((part) => userAgent.match(new RegExp(part, "i"))?.[0])
		.filter(Boolean);

/**
 * Find the first bot patterns that match the given user agent.
 */
export const isbotPattern = (userAgent: string): string | null =>
	list.find((pattern) => new RegExp(pattern, "i").test(userAgent)) ?? null;

/**
 * Find all bot patterns that match the given user agent.
 */
export const isbotPatterns = (userAgent: string): string[] =>
	list.filter((pattern) => new RegExp(pattern, "i").test(userAgent));
