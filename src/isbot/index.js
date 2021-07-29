import list from '../list.json'
import { amend } from '../amend/index.js'

amend(list)

/**
 *
 */
export class Isbot {
  #list;
  #pattern;
  constructor (patterns) {
    if (patterns) {
      this.#list = patterns
    } else {
      this.#list = list.slice()
    }
    this.#update()
  }

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

  get list () {
    return this.#list
  }

  test (ua) {
    return this.#pattern.test(ua)
  }

  /**
   * Get the match for strings' known crawler pattern
   * @param  {string} ua
   * @return {string}
   */
  find (ua) {
    const match = ua.match(this.#pattern)
    return match && match[0]
  }

  /**
   * Extent patterns for known crawlers
   * @param  {string[]} filters
   * @return {void}
   */
  extend (filters) {
    [].push.apply(
      this.#list,
      filters.filter(
        (rule) => this.#index(rule) === -1
      ).map(
        filter => filter.toLowerCase()
      )
    )
    this.#update()
  }

  /**
   * Exclude patterns from bot pattern rule
   * @param  {string[]} filters
   * @return {void}
   */
  exclude (filters) {
    let { length } = filters
    while (length--) {
      const index = this.#index(filters[length])
      if (index > -1) {
        this.#list.splice(index, 1)
      }
    }
    this.#update()
  }

  spawn (list) {
    return new Isbot(list || this.#list)
  }
}
