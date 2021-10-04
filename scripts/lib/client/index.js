const { request } = require('https')
const FormData = require('form-data')

/**
 * Simple HTTP client implementation
 * @param {string} ø.url
 * @param {string} [ø.method='GET']
 * @param {object<string, string>} [data]
 * @param {object<string, string>} [headers={}]
 * @returns {Promise<string>} response body
 */
module.exports = function client ({ url, method = 'GET', data, headers = {} } = {}) {
  const { hostname, pathname, search } = new URL(url)
  const path = [pathname, search].join('')
  return new Promise(
    (resolve, reject) => {
      try {
        const form = data
          ? new FormData()
          : null

        form && Object.entries(data).forEach(
          entry => form.append(...entry)
        )

        const instance = request(
          {
            hostname,
            port: 443,
            path,
            method,
            headers: Object.assign(
              (form && form.getHeaders()) || {},
              headers
            )
          },
          response => {
            if (Math.floor(response.statusCode / 100) !== 2) {
              const error = new Error(response.statusText)
              error.code = response.statusCode
              error.headers = JSON.stringify(response.headers)
              reject(error)
              return
            }

            const chunks = []

            response.on(
              'data',
              chunk => chunks.push(chunk)
            )
            response.on(
              'end',
              () => resolve(
                chunks.map(
                  chunk => chunk.toString()
                ).join('')
              )
            )
          }
        ).on(
          'error',
          reject
        )

        form && form.pipe(instance)
        instance.end()
      } catch (error) {
        reject(error)
      }
    }
  )
}
