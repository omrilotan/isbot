# isbot 🤖/👨‍🦰

Detect bots/crawlers/spiders using the user agent string.

[![](https://img.shields.io/npm/v/isbot.svg?style=flat-square)](https://www.npmjs.com/package/isbot) [![](https://img.shields.io/node/v/isbot?style=flat-square)](https://nodejs.org/en/download/releases/) [![](https://img.shields.io/bundlephobia/minzip/isbot?style=flat-square)](https://bundlephobia.com/result?p=isbot)

[![](https://img.shields.io/circleci/build/github/gorangajic/isbot?style=flat-square)](https://circleci.com/gh/gorangajic/isbot) [![](https://img.shields.io/npm/dt/isbot?style=flat-square)](https://www.npmjs.com/package/isbot) [![](https://img.shields.io/github/last-commit/gorangajic/isbot?style=flat-square)](https://github.com/gorangajic/isbot/graphs/commit-activity) [![](https://img.shields.io/librariesio/sourcerank/npm/isbot?style=flat-square)](https://libraries.io/npm/isbot)

### install

## Usage

```js
const isbot = require('isbot');
```

### Simple detection

```js
// Nodejs HTTP
isbot(request.getHeader('User-Agent'))

// ExpressJS
isbot(req.get['user-agent'])

// User Agent string
isbot('Googlebot/2.1 (+http://www.google.com/bot.html)') // true
isbot('Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36') // false
```

### Add crawler user agents
Add rules to user agent match RegExp

```js
isbot('Mozilla/5.0') // false
isbot.extend([
    'istat',
    'httpclient',
    '^mozilla/\\d\\.\\d$'
])
isbot('Mozilla/5.0') // true
```

### Remove matches of known crawlers
Remove rules to user agent match RegExp (see existing rules in `list.json` file)

```js
isbot('Google Page Speed Insights') // true
isbot.exclude([
  'Google Page Speed Insights',
  'Chrome-Lighthouse'
])
isbot('Google Page Speed Insights') // false
```

### Verbose result
Return the respective match for bot user agent rule

```js
isbot.find('Googlebot/2.1 (+http://www.google.com/bot.html)') // 'bot'
```

## Data sources

### Crawlers user agents:
- [user-agents.net](https://user-agents.net/bots)
- [crawler-user-agents repo](https://raw.githubusercontent.com/monperrus/crawler-user-agents)
- [Manual list](./tests/fixtures/manual-crawlers-list.yml)

### Non bot user agents:
- [Manual list](./tests/fixtures/manual-legit-browsers.yml) (source: [whatismybrowser.com](https://developers.whatismybrowser.com/useragents/explore/software_name/))
