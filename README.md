# isbot [![](https://img.shields.io/npm/v/isbot.svg)](https://www.npmjs.com/package/isbot)

[![Tests Status](https://github.com/gorangajic/isbot/workflows/Test/badge.svg)](https://github.com/gorangajic/isbot/actions)

### install

```console
$ npm install isbot --save
```

### usage

```js
isBot(req.headers['user-agent'])

isBot("Googlebot/2.1 (+http://www.google.com/bot.html)") // true

isBot("Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36") // false
```

### extending

```js
isBot("Mozilla/5.0") // false

var myList = [
    'istat',
    'newspaper',
    'httpclient',
    '^mozilla/\\d\\.\\d$',
];

isBot.extend(myList);

isBot("Mozilla/5.0") // true
```

### excluding

```js
isBot('Ceramic Tile Installation Guide') // true

var myList = [
	'Ceramic Tile Installation Guide',
	'NORAD National Defence Network'
];

isBot.exclude(myList);

isBot('Ceramic Tile Installation Guide') // false
```
