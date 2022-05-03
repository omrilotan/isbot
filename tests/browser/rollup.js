const { join } = require('path')
const { nodeResolve } = require('@rollup/plugin-node-resolve')

module.exports = {
  input: join(__dirname, 'spec.js'),
  output: {
    file: join(__dirname, 'dist.js'),
    format: 'iife',
    name: 'isbot'
  },
  plugins: [
    nodeResolve({ browser: true })
  ]
}
