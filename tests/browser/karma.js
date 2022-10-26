const { output: { file } } = require('./rollup.js')
const { env: { CI } } = process

module.exports = (config) => {
  const { LOG_INFO: logLevel } = config
  config.set({
    browsers: ['Chrome', CI ? undefined : 'Firefox'].filter(Boolean),
    frameworks: ['mocha'],
    port: 9876,
    logLevel,
    singleRun: true,
    concurrency: 1,
    hooks: [
      'karma-chrome-launcher',
      CI ? undefined : 'karma-firefox-launcher',
      'karma-mocha',
      'karma-mocha-reporter'
    ].filter(Boolean),
    reporters: ['mocha'],
    basePath: __dirname,
    files: [file]
  })
}
