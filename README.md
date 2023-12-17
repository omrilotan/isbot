# isbot 🤖/👨‍🦰

[![](https://img.shields.io/npm/v/isbot.svg?style=flat-square)](https://www.npmjs.com/package/isbot) [![](https://img.shields.io/npm/dt/isbot?style=flat-square)](https://www.npmjs.com/package/isbot) [![](https://img.shields.io/circleci/build/github/omrilotan/isbot?style=flat-square)](https://circleci.com/gh/omrilotan/isbot) [![](https://img.shields.io/github/last-commit/omrilotan/isbot?style=flat-square)](https://github.com/omrilotan/isbot/graphs/commit-activity) [![](https://data.jsdelivr.com/v1/package/npm/isbot/badge)](https://www.jsdelivr.com/package/npm/isbot)

[![](./page/isbot.svg)](https://isbot.js.org)

Recognise bots/crawlers/spiders using the user agent string.

> ## Migrate to version 4 today
>
> `npm i isbot@4` or `npm i isbot@next`

> ## Releasing Version 4: deprecation notice
>
> ### Version 4 will become the "latest" version on npm on January 2024
>
> `npm i isbot@4` or `npm i isbot@next`
>
> I'll be releasing version 4 as "latest" soon. Migration is simple, just replace `import isbot from "isbot"` with `import { isbot } from "isbot"` in your code.
>
> If you are using extended functionality, there will be more changes and the feature you're using is no longer supported as is. Please open an issue if you need help migrating.
> Please visit [isbot](https://isbot.js.org) for more information.

## Usage

```ts
import { isbot } from "isbot";

// Nodejs HTTP
isbot(request.getHeader("User-Agent"));

// ExpressJS
isbot(req.get("user-agent"));

// Browser
isbot(navigator.userAgent);

// User Agent string
isbot(
  "Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
); // true

isbot(
  "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36",
); // false
```

Using JSDeliver CDN you can import an iife script

> See specific versions https://www.jsdelivr.com/package/npm/isbot or https://cdn.jsdelivr.net/npm/isbot

```html
<script src="https://cdn.jsdelivr.net/npm/isbot@4"></script>
// isbot is global isbot(navigator.userAgent)
```

## Additional named imports

| import        | Type                                                | Description                                                               |
| ------------- | --------------------------------------------------- | ------------------------------------------------------------------------- |
| pattern       | _{RegExp}_                                          | The regular expression used to identify bots                              |
| list          | _{string[]}_                                        | List of all individual pattern parts                                      |
| isbotMatch    | _{(userAgent: string): string \| null}_             | The substring matched by the regular expression                           |
| isbotMatches  | _{(userAgent: string): string[]}_                   | All substrings matched by the regular expression                          |
| isbotPattern  | _{(userAgent: string): string \| null}_             | The regular expression used to identify bot substring in the user agent   |
| isbotPatterns | _{(userAgent: string): string[]}_                   | All regular expressions used to identify bot substrings in the user agent |
| createIsbot   | _{(pattern: RegExp): (userAgent: string): boolean}_ | Create a custom isbot function                                            |

## Examples

### Create a custom isbot function ignoring Chrome Lighthouse

```ts
import { createIsbot, list } from "isbot";

const isbot = createIsbot(
  new RegExp(
    list
      .filter((record) => !new RegExp(record, "i").test("Chrome-Lighthouse"))
      .join("|"),
    "i",
  ),
);
```

### Create a custom isbot function including another pattern

```ts
import { createIsbot, list } from "isbot";

const isbot = createIsbot(new RegExp(list.concat("shmulik").join("|"), "i"));
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

- Flag pageviews to consider with **business analysis**.
- Prefer to serve cached content and **relieve service load**.
- Omit third party solutions' code (tags, pixels) and **reduce costs**.
  > It is not recommended to whitelist requests for any reason based on user agent header only. Instead other methods of identification can be added such as [reverse dns lookup](https://www.npmjs.com/package/reverse-dns-lookup).

## Data sources

We use external data sources on top of our own lists to keep up to date

### Crawlers user agents:

- [user-agents.net](https://user-agents.net/bots)
- [crawler-user-agents repo](https://raw.githubusercontent.com/monperrus/crawler-user-agents/master/crawler-user-agents.json)
- [myip.ms](https://www.myip.ms/files/bots/live_webcrawlers.txt)
- [matomo.org](https://github.com/matomo-org/device-detector/blob/master/Tests/fixtures/bots.yml)
- A Manual list

### Non bot user agents:

- [user-agents npm package](https://www.npmjs.com/package/user-agents)
- A Manual list

Missing something? Please [open an issue](https://github.com/omrilotan/isbot/issues/new/choose)

## Major releases breaking changes ([full changelog](./CHANGELOG.md))

### [**Version 4**](https://github.com/omrilotan/isbot/releases/tag/v4.0.0)

Remove `isbot` function default export in favour of a named export.

```ts
import { isbot } from "isbot";
```

### [**Version 3**](https://github.com/omrilotan/isbot/releases/tag/v3.0.0)

Remove testing for node 6 and 8

### [**Version 2**](https://github.com/omrilotan/isbot/releases/tag/v2.0.0)

Change return value for isbot: `true` instead of matched string

### [**Version 1**](https://github.com/omrilotan/isbot/releases/tag/v1.0.0)

No functional change

## Real world data

| Execution times in milliseconds
| -
| ![](https://user-images.githubusercontent.com/516342/125660283-c6ef9db8-6162-449b-912d-7b7ae97ef411.png)

```

```
