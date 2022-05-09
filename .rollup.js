const { join } = require('path')
const { babel } = require('@rollup/plugin-babel')
const { importAssertionsPlugin } = require('rollup-plugin-import-assert')
const { importAssertions } = require('acorn-import-assertions')

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
      sourcemapFile: join(__dirname, [ 'index', ext, 'map' ].join('.')),
      preferConst: false
    },
    acornInjectPlugins: [ importAssertions ],
    plugins: [
      babel({ babelHelpers: 'bundled' }),
      importAssertionsPlugin()
    ]
  })
)
