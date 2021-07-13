/**
 * Detect if a user agent is a bot, crawler or spider
 * @param ua A user agent string. Non strings will be cast to string before the check
 */
declare function isbot(ua: any): boolean;

declare namespace isbot {
  /**
   * Extend the built-in list of bot user agent
   * @param filters An array of user agents
   */
  function extend(filters: string[]): void;

  /**
   * Removes a set of user agent from the built-in list
   * @param filters An array of user agents
   */
  function exclude(filters: string[]): void;

  /**
   * Return the respective match for bot user agent rule
   * @param ua A user agent string
   */
  function find(ua: string): string;
}

export = isbot;
