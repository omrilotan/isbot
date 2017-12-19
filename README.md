# isbot

[![Build Status](https://semaphoreci.com/api/v1/projects/b2ac790f-18fc-46d5-8726-2019a62a0996/541851/badge.svg)](https://semaphoreci.com/gorangajic/isbot-2)


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
