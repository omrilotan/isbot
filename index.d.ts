/**
 * Detect if a user agent is a bot, crawler or spider
 * @param userAgent The user agent
 */
declare function isbot(userAgent: string): boolean;

declare namespace isbot {
  /**
   * Extend the built-in list of bot user agent
   * @param additionalFilters An array of user agents
   */
  function extend(additionalFilters: string[]): void;

  /**
   * Removes a set of user agent from the built-in list
   * @param excludedFilters An array of user agents
   */
  function exclude(excludedFilters: string[]): void;

  /**
   * Return the respective match for bot user agent rule
   * @param excludedFilters An array of user agents
   */
  function find(userAgent: string): string;
}

export = isbot;
