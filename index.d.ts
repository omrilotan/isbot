/**
 * Detect if a user agent is a bot, crawler or spider
 * @param ua A user agent string. Non strings will be cast to string before the check
 */
declare function isbot(ua: any): boolean;

declare namespace isbot {
  /**
   * Extend the built-in list of bot user agent
   * @param {string[]} filters An array of regular expression patterns
   */
  function extend(filters: string[]): void;

  /**
   * Removes a set of user agent from the built-in list
   * @param {string[]} filters An array of regular expression patterns
   */
  function exclude(filters: string[]): void;

  /**
   * Return the respective match for bot user agent rule
   * @param {string} ua A user agent string
   */
  function find(ua: string): string;

  /**
   * Create a new isbot function complete with all its interface
   * @param {string[]} list of strings representing regular expression patterns
   * @returns isbot function with full interface
   */
  function spawn(list?: string[]): isbot;
}

export = isbot;
