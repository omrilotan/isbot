/**
 * Detect whether a user agent string represents a bot, crawler or spider - or not
 * @param {string} ua User agent string
 * @returns {boolean}
 */
declare function isbot(ua: string): boolean;

export = isbot;
