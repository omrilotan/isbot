# isbot 🤖/👨‍🦰

Detect bots/crawlers/spiders using the user agent string.

[![](https://img.shields.io/npm/v/isbot.svg?style=flat-square)](https://www.npmjs.com/package/isbot) [![](https://img.shields.io/node/v/isbot?style=flat-square)](https://nodejs.org/en/download/releases/) [![](https://img.shields.io/bundlephobia/minzip/isbot?style=flat-square)](https://bundlephobia.com/result?p=isbot@2.5.5)

[![](https://img.shields.io/circleci/build/github/gorangajic/isbot?style=flat-square)](https://circleci.com/gh/gorangajic/isbot) [![](https://img.shields.io/npm/dt/isbot?style=flat-square)](https://www.npmjs.com/package/isbot) [![](https://img.shields.io/github/last-commit/gorangajic/isbot?style=flat-square)](https://github.com/gorangajic/isbot/graphs/commit-activity) [![](https://img.shields.io/librariesio/sourcerank/npm/isbot?style=flat-square)](https://libraries.io/npm/isbot)

### install

```console
$ npm i isbot
```

## Usage

```js
var isBot = require('isbot');
```

### Simple detection

```js
isBot(req.headers['user-agent'])

isBot('Googlebot/2.1 (+http://www.google.com/bot.html)') // true

isBot('Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36') // false
```

### Extending more user agents
Add rules to user agent match RegExp

```js
isBot('Mozilla/5.0') // false

var myList = [
    'istat',
    'newspaper',
    'httpclient',
    '^mozilla/\\d\\.\\d$',
];

isBot.extend(myList);

isBot('Mozilla/5.0') // true
```

### Excluding known crawlers
Remove rules to user agent match RegExp (see existing rules in `list.json` file)

```js
isBot('Ceramic Tile Installation Guide') // true

var myList = [
	'Ceramic Tile Installation Guide',
	'NORAD National Defence Network'
];

isBot.exclude(myList);

isBot('Ceramic Tile Installation Guide') // false
```

### Verbose result
Return the respective match for bot user agent rule

```js
isBot.find('Googlebot/2.1 (+http://www.google.com/bot.html)') // 'bot'
```
