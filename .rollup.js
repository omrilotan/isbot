const { join } = require('path')
const { babel } = require('@rollup/plugin-babel')
const { importAssertions } = require('acorn-import-assertions')
const json = require('@rollup/plugin-json')

module.exports = [
  {
    ext: 'iife.js', format: 'iife', input: 'index.js'
  },
  {
    ext: 'js', format: 'cjs', input: 'index.js'
  },
  {
    ext: 'mjs', format: 'es', input: 'index.m.js'
  }
].map(
  ({ ext, format, input }) => ({
    input: join(__dirname, 'src', input),
    output: {
      file: join(__dirname, [ 'index', ext ].join('.')),
      format,
      exports: 'auto',
      name: 'isbot',
      strict: false,
      sourcemap: true,
      sourcemapFile: join(__dirname, [ 'index', ext, 'map' ].join('.'))
    },
    acornInjectPlugins: [ importAssertions ],
    plugins: [
      babel({ babelHelpers: 'bundled' }),
      json()
    ]
  })
)
