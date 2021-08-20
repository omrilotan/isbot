const { join } = require('path')
const json = require('@rollup/plugin-json')
const { babel } = require('@rollup/plugin-babel')

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
    plugins: [
      json({ compact: true }),
      babel({ babelHelpers: 'bundled' })
    ]
  })
)
