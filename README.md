# isbot [![](https://img.shields.io/npm/v/isbot.svg)](https://www.npmjs.com/package/isbot)

Detect bots/crawlers/spiders via the user agent.

[![](https://circleci.com/gh/gorangajic/isbot.svg?style=svg)](https://circleci.com/gh/gorangajic/isbot)

### install

```console
$ npm i isbot
```

## Usage

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
