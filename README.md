# isbot [![](https://img.shields.io/npm/v/isbot.svg)](https://www.npmjs.com/package/isbot)

Detect bots/crawlers/spiders via the user agent.

[![](https://github.com/gorangajic/isbot/workflows/Test/badge.svg)](https://github.com/gorangajic/isbot/actions?query=workflow%3ATest) [![](https://github.com/gorangajic/isbot/workflows/Maintenance/badge.svg)](https://github.com/gorangajic/isbot/actions?query=workflow%3AMaintenance)

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

### `extend` and `exclude` use case
Use [lookbehind assertion](https://github.com/tc39/proposal-regexp-lookbehind), introduced in V8 version 4.9 to exclude "Cubot" from "bot" rule

```js
isBot.exclude(['bot']);
isBot.extend(['(?<! cu)bot']); // Recognise cubot browser as legit browser

isBot('Mozilla/5.0 (Linux; Android 8.0.0; CUBOT_P20) ...') // false
isBot('Googlebot/2.1 (+http://www.google.com/bot.html)') // true
```

### Verbose result
Return the respective match for bot user agent rule

```js
isBot.find('Googlebot/2.1 (+http://www.google.com/bot.html)') // 'bot'
```
