/**
 * Detect if a user agent is a bot, crawler or spider
 * @param userAgent The user agent
 */
declare function testUserAgent(userAgent: string): boolean;

/**
 * Extend the built-in list of bot user agent
 * @param additionalFilters An array of user agents
 */
declare function extend(additionalFilters: string[]): void;

/**
 * Removes a set of user agent from the built-in list
 * @param excludedFilters An array of user agents
 */
declare function exclude(excludedFilters: string[]): void;

testUserAgent.extend = extend;
testUserAgent.exclude = exclude;
export = testUserAgent;
