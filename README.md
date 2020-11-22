# isbot 🤖/👨‍🦰

[![](./page/isbot.svg)](https://isbot.js.org)

[![](https://img.shields.io/npm/v/isbot.svg?style=flat-square)](https://www.npmjs.com/package/isbot) [![](https://img.shields.io/node/v/isbot?style=flat-square)](https://nodejs.org/en/download/releases/) [![](https://img.shields.io/bundlephobia/minzip/isbot?style=flat-square)](https://bundlephobia.com/result?p=isbot)

[![](https://img.shields.io/circleci/build/github/omrilotan/isbot?style=flat-square)](https://circleci.com/gh/omrilotan/isbot) [![](https://img.shields.io/npm/dt/isbot?style=flat-square)](https://www.npmjs.com/package/isbot) [![](https://img.shields.io/github/last-commit/omrilotan/isbot?style=flat-square)](https://github.com/omrilotan/isbot/graphs/commit-activity)

[![](https://img.shields.io/librariesio/sourcerank/npm/isbot?style=flat-square)](https://libraries.io/npm/isbot) [![](https://badges.openbase.io/js/rating/isbot.svg)](https://openbase.io/js/isbot#rate)

Detect bots/crawlers/spiders using the user agent string.

## Usage
### Simple detection

```js
const isbot = require('isbot')

// Nodejs HTTP
isbot(request.getHeader('User-Agent'))

// ExpressJS
isbot(req.get('user-agent'))

// User Agent string
isbot('Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)') // true
isbot('Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36') // false
```

### Add crawler user agents
Add rules to user agent match RegExp

```js
isbot('Mozilla/5.0') // false
isbot.extend([
    'istat',
    '^mozilla/\\d\\.\\d$'
])
isbot('Mozilla/5.0') // true
```

### Remove matches of known crawlers
Remove rules to user agent match RegExp (see existing rules in `list.json` file)

```js
isbot('Chrome-Lighthouse') // true
isbot.exclude(['chrome-lighthouse']) // pattern is case insensitive
isbot('Chrome-Lighthouse') // false
```

### Verbose result
Return the respective match for bot user agent rule

```js
isbot.find('Mozilla/5.0 (X11; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0 DejaClick/2.9.7.2') // 'DejaClick'
```

## Definitions
- **Bot.** Autonomous program imitating or replacing some aspect of a human behaviour, performing repetitive tasks much faster than human users could.
- **Good bot.** Automated programs who visit websites in order to collect useful information. Web crawlers, site scrapers, stress testers, preview builders and other programs are welcomed on most websites because they serve purposes of mutual benefits.
- **Bad bot.** Programs which are designed to perform malicious actions, ultimately hurting businesses. Testing credential databases, DDoS attacks, spam bots.

## Clarifications
### What does "isbot" do?
This package aims to identify "Good bots". Those who voluntarily identify themselves by setting a unique, preferably descriptive, user agent, usually by setting a dedicated request header.

### What doesn't "isbot" do?
It does not try to recognise malicious bots or programs disguising themselves as real users.

### Why would I want to identify good bots?
Recognising good bots such as web crawlers is useful for multiple purposes. Although it is not recommended to serve different content to web crawlers like Googlebot, you can still elect to
- Flag bot pageviews to consider in business analysis
- Prefer to serve cached content and relieve service load
- Omit third party solutions' code (tags, pixels)
> It is not recommended to whitelist requests for any reason based on user agent header only. Instead other methods of identification can be added such as reverse dns lookup.

## Data sources

### Crawlers user agents:
- [user-agents.net](https://user-agents.net/bots)
- [crawler-user-agents repo](https://raw.githubusercontent.com/monperrus/crawler-user-agents/master/crawler-user-agents.json)
- [myip.ms](https://www.myip.ms/files/bots/live_webcrawlers.txt)
- [matomo.org](https://github.com/matomo-org/device-detector/blob/master/Tests/fixtures/bots.yml)
- [Manual list](./tests/fixtures/manual-crawlers-list.yml)

### Non bot user agents:
- [user-agents npm package](https://www.npmjs.com/package/user-agents)
- [Manual list](./tests/fixtures/manual-legit-browsers.yml) (source: [whatismybrowser.com](https://developers.whatismybrowser.com/useragents/explore/software_name/))

Missing something? Please [open an issue](https://github.com/omrilotan/isbot/issues/new/choose)
