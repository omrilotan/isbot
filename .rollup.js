const { join } = require('path')
const { babel } = require('@rollup/plugin-babel')
const { importAssertions } = require('acorn-import-assertions')
const json = require('@rollup/plugin-json')

module.exports = [
  {
    ext: 'js', format: 'cjs'
  },
  {
    ext: 'mjs', format: 'es'
  }
].map(
  ({ ext, format }) => ({
    input: join(__dirname, 'src', 'index.js'),
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
