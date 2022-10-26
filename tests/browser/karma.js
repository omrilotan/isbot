const { output: { file } } = require('./rollup.js')
const { env: { CI } } = process;

module.exports = (config) => {
  const { LOG_INFO: logLevel } = config
  config.set({
    browsers: ['Chrome', CI ? 'Firefox' : undefined ].filter(Boolean),
    frameworks: ['mocha'],
    port: 9876,
    logLevel,
    singleRun: true,
    concurrency: 1,
    hooks: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-mocha',
      'karma-mocha-reporter'
    ],
    reporters: ['mocha'],
    basePath: __dirname,
    files: [file]
  })
}
