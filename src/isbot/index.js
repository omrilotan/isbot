import list from '../list.json'
import { amend } from '../amend/index.js'

amend(list)

/**
 * Test user agents for matching patterns
 */
export class Isbot {
  /**
   * @type {string[]}
   */
  #list;

  /**
   * @type {RegExp}
   */
  #pattern;

  constructor (patterns) {
    this.#list = patterns || list.slice()
    this.#update()
  }

  /**
   * Recreate the pattern from rules list
   */
  #update () {
    this.#pattern = new RegExp(
      this.#list.join('|'),
      'i'
    )
  }

  /**
   * Find the first index of an existing rule or -1 if not found
   * @param  {string} rule
   * @returns {number}
   */
  #index (rule) {
    return this.#list.indexOf(rule.toLowerCase())
  }

  /**
   * Match given string against out pattern
   * @param  {string} ua User Agent string
   * @returns {boolean}
   */
  test (ua) {
    return this.#pattern.test(ua)
  }

  /**
   * Get the match for strings' known crawler pattern
   * @param  {string} ua User Agent string
   * @returns {string}
   */
  find (ua = '') {
    const match = ua.match(this.#pattern)
    return match && match[0]
  }

  /**
   * Extent patterns for known crawlers
   * @param  {string[]} filters
   * @returns {void}
   */
  extend (filters = []) {
    [].push.apply(
      this.#list,
      filters.filter(
        rule => this.#index(rule) === -1
      ).map(
        filter => filter.toLowerCase()
      )
    )
    this.#update()
  }

  /**
   * Exclude patterns from bot pattern rule
   * @param  {string[]} filters
   * @returns {void}
   */
  exclude (filters = []) {
    let { length } = filters
    while (length--) {
      const index = this.#index(filters[length])
      if (index > -1) {
        this.#list.splice(index, 1)
      }
    }
    this.#update()
  }

  /**
   * Create a new Isbot instance using given list or self's list
   * @param  {string[]} [list]
   * @returns {Isbot}
   */
  spawn (list) {
    return new Isbot(list || this.#list)
  }
}
