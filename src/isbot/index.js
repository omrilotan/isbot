import list from '../list.json' assert { type: 'json' }
import { amend } from '../amend/index.js'

amend(list)

const flags = 'i'

/**
 * Test user agents for matching patterns
 */
export class Isbot {
  /**
   * @type {string[]}
   */
  #list

  /**
   * @type {RegExp}
   */
  #pattern

  constructor (patterns) {
    this.#list = patterns || list.slice()
    this.#update()

    const isbot = ua => this.test(ua)

    return Object.defineProperties(
      isbot,
      Object.entries(Object.getOwnPropertyDescriptors(Isbot.prototype)).reduce(
        (accumulator, [prop, descriptor]) => {
          if (typeof descriptor.value === 'function') {
            Object.assign(
              accumulator,
              { [prop]: { value: this[prop].bind(this) } }
            )
          }
          if (typeof descriptor.get === 'function') {
            Object.assign(
              accumulator,
              { [prop]: { get: () => this[prop] } }
            )
          }
          return accumulator
        },
        {}
      )
    )
  }

  /**
   * Recreate the pattern from rules list
   */
  #update () {
    this.#pattern = new RegExp(
      this.#list.join('|'),
      flags
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
   * Get a clone of the pattern
   * @type RegExp
   */
  get pattern () {
    return new RegExp(this.#pattern)
  }

  /**
   * Match given string against out pattern
   * @param  {string} ua User Agent string
   * @returns {boolean}
   */
  test (ua) {
    return Boolean(ua) && this.#pattern.test(ua)
  }

  /**
   * Get the match for strings' known crawler pattern
   * @param  {string} ua User Agent string
   * @returns {string|null}
   */
  find (ua = '') {
    const match = ua.match(this.#pattern)
    return match && match[0]
  }

  /**
   * Get the patterns that match user agent string if any
   * @param  {string} ua User Agent string
   * @returns {string[]}
   */
  matches (ua = '') {
    return this.#list.filter(
      entry => new RegExp(entry, flags).test(ua)
    )
  }

  /**
   * Clear all patterns that match user agent
   * @param  {string} ua User Agent string
   * @returns {void}
   */
  clear (ua = '') {
    this.exclude(this.matches(ua))
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
