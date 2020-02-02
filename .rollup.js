const commonjs = require('@rollup/plugin-commonjs');
const json = require('@rollup/plugin-json');

module.exports = {
  input: 'tests/browser.js',
  output: {
    file: 'tests/.browser-tests.js',
    format: 'iife'
  },
  plugins: [
    commonjs(),
    json()
  ]
}
