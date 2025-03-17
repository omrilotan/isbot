# Changelog

## [5.1.25](https://github.com/omrilotan/isbot/compare/v5.1.24...v5.1.25)

- [Pattern] Pattern update: Reduce complexity

## [5.1.24](https://github.com/omrilotan/isbot/compare/v5.1.23...v5.1.24)

- [Pattern] Pattern update: Add generic pattern, remove some specific patterns

## [5.1.23](https://github.com/omrilotan/isbot/compare/v5.1.22...v5.1.23)

- [Pattern] Pattern updates

## [5.1.22](https://github.com/omrilotan/isbot/compare/v5.1.21...v5.1.22)

- [Pattern] Pattern updates

## [5.1.21](https://github.com/omrilotan/isbot/compare/v5.1.20...v5.1.21)

- [Pattern] Pattern updates

## [5.1.20](https://github.com/omrilotan/isbot/compare/v5.1.19...v5.1.20)

- [Pattern] Pattern updates

## [5.1.19](https://github.com/omrilotan/isbot/compare/v5.1.18...v5.1.19)

- [Pattern] Pattern updates

## [5.1.18](https://github.com/omrilotan/isbot/compare/v5.1.17...v5.1.18)

- [Pattern] Pattern updates

## [5.1.17](https://github.com/omrilotan/isbot/compare/v5.1.16...v5.1.17)

- [Pattern] Pattern updates for better recognition

## [5.1.16](https://github.com/omrilotan/isbot/compare/v5.1.15...v5.1.16)

- [Pattern] Treat CCleaner broswer as an actual browser, not a bot

## [5.1.15](https://github.com/omrilotan/isbot/compare/v5.1.14...v5.1.15)

- [Pattern] Pattern updates for better recognition

## [5.1.14](https://github.com/omrilotan/isbot/compare/v5.1.13...v5.1.14)

- [Pattern] More accurate patterns for some substrings

## [5.1.13](https://github.com/omrilotan/isbot/compare/v5.1.12...v5.1.13)

- [Pattern] Recognise [Owler (Open Web Search Project)](https://openwebsearch.eu/owler/) as a bot

## [5.1.12](https://github.com/omrilotan/isbot/compare/v5.1.11...v5.1.12)

- [Pattern] Pattern updates: [Project LightSpeed](https://engineering.fb.com/2020/03/02/data-infrastructure/messenger/) browsers are not bots

## [5.1.11](https://github.com/omrilotan/isbot/compare/v5.1.10...v5.1.11)

- [Pattern] Pattern updates

## [5.1.10](https://github.com/omrilotan/isbot/compare/v5.1.9...v5.1.10)

- [Pattern] Pattern updates

## [5.1.9](https://github.com/omrilotan/isbot/compare/v5.1.8...v5.1.9)

- [Pattern] A more careful match for RSS substring

## [5.1.8](https://github.com/omrilotan/isbot/compare/v5.1.7...v5.1.8)

- [Pattern] Recognise timestamp in user agent string - is used to generate unique strings for each request

## [5.1.7](https://github.com/omrilotan/isbot/compare/v5.1.6...v5.1.7)

- [Pattern] Ignore NewsSapphire in-app browser (news app)
- [Pattern] Ignore locales with calendar in user agent

## [5.1.6](https://github.com/omrilotan/isbot/compare/v5.1.5...v5.1.6)

- [FIX] Browser files (jsdeliver): UMD is global and ESM is named

## [5.1.5](https://github.com/omrilotan/isbot/compare/v5.1.4...v5.1.5)

- Add substring "watch" to pattern

## [5.1.4](https://github.com/omrilotan/isbot/compare/v5.1.3...v5.1.4)

- Recognise search providers inapp browsers
- Ignore Crosswalk project: An old project that is no longer maintained and has insignificant usage
- PDRL Analyzer

## [5.1.3](https://github.com/omrilotan/isbot/compare/v5.1.2...v5.1.3)

- Recognise browsers: Ecosia ios in-app browser, Phantom in-app browser

## [5.1.2](https://github.com/omrilotan/isbot/compare/v5.1.1...v5.1.2)

- Add bots: Cypress, Detectify, InternetMeasurement, BuiltWith
- Recognise browser: Zip Recruiter job search app, Ecosia android in-app browser

## [5.1.1](https://github.com/omrilotan/isbot/compare/v5.1.0...v5.1.1)

- Reduce pattern size by introducing the substring ".com" and improve generic pattern

## [5.1.0](https://github.com/omrilotan/isbot/compare/v5.0.0...v5.1.0)

- Build now compatibile with older Javascript version: es2016

## [5.0.0](https://github.com/omrilotan/isbot/compare/v4.4.0...v5.0.0)

- Remove named export "pattern" from the interface, instead use "getPattern" method
- Add a couple of bot patterns

## [4.4.0](https://github.com/omrilotan/isbot/compare/v4.3.0...v4.4.0)

- Add a naive fallback pattern for engines that do not support lookbehind in regular expressions
- Add isbotNaive function to identify bots using a naive approach (simpler and faster)

## [4.3.0](https://github.com/omrilotan/isbot/compare/v4.2.0...v4.3.0)

- Accept `undefined` in place of user agent string to allow headers property to be used "as is" (`request.headers["user-agent"]`)

## [4.2.0](https://github.com/omrilotan/isbot/compare/v4.1.1...v4.2.0)

- Accept `null` in place of user agent string to allow header value to be used "as is" (`request.headers.get("user-agent")`)

## [4.1.1](https://github.com/omrilotan/isbot/compare/v4.1.0...v4.1.1)

- Recognise browsers with GMS Core ([Google's Play Services](https://github.com/microg/GmsCore/wiki)) as natural non-bot browsers
- A slightly neater typescript decleration file
- Adjust "bot" pattern to recognise bot as a standalone word or word suffix (excluding "Cubot")
- Recognise "rest-client" as a bot

## [4.1.0](https://github.com/omrilotan/isbot/compare/v4.0.1...v4.1.0)

- Add createIsbotFromList: Create a custom isbot function from a list of string representation patterns
- Recognise browsers with HMS Core (Huawei Mobile Services) as natural non-bot browsers

## [4.0.1](https://github.com/omrilotan/isbot/compare/v4.0.0...v4.0.1)

- Pattern optimisation (performance improvement)

## [4.0.0](https://github.com/omrilotan/isbot/compare/v3.7.1...v4.0.0)

### Breaking changes

This change is meant to reduce the size of the package and improve performance by building the regular expression in build time instead of runtime.

- Change interface

  - Remove default import. Use named import instead: `import { isbot } from "isbot";`
  - Drop `isbot` attached functions from the interface. `isbot.<SOMETHING>` is no longer supported

- Drop support for EOL node versions

### New features

```ts
import { <SOMETHING> }  from "isbot";
```

| import        | Type                                                | Description                                                               |
| ------------- | --------------------------------------------------- | ------------------------------------------------------------------------- |
| pattern       | _{RegExp}_                                          | The regular expression used to identify bots                              |
| list          | _{string[]}_                                        | List of all individual pattern parts                                      |
| isbotMatch    | _{(userAgent: string): string \| null}_             | The substring matched by the regular expression                           |
| isbotMatches  | _{(userAgent: string): string[]}_                   | All substrings matched by the regular expression                          |
| isbotPattern  | _{(userAgent: string): string \| null}_             | The regular expression used to identify bot substring in the user agent   |
| isbotPatterns | _{(userAgent: string): string[]}_                   | All regular expressions used to identify bot substrings in the user agent |
| createIsbot   | _{(pattern: RegExp): (userAgent: string): boolean}_ | Create a custom isbot function                                            |

## [3.8.0](https://github.com/omrilotan/isbot/compare/v3.7.1...v3.8.0)

- Add "isbot.isbot" property and "isbot" named export to allow easier migration to version 4

## [3.7.1](https://github.com/omrilotan/isbot/compare/v3.7.0...v3.7.1)

- Replace "ghost" with "inspect" to avoid false positives

## [3.7.0](https://github.com/omrilotan/isbot/compare/v3.6.13...v3.7.0)

- Expose iife and support JSDeliver CDN

## [3.6.13](https://github.com/omrilotan/isbot/compare/v3.6.12...v3.6.13)

- Treat Splash browser as bot [@viraptor](https://github.com/viraptor)

## [3.6.12](https://github.com/omrilotan/isbot/compare/v3.6.11...v3.6.12)

- mem: Make a group non capturing

## [3.6.11](https://github.com/omrilotan/isbot/compare/v3.6.10...v3.6.11)

- Fix "news" pattern to allow [Google News Android App](https://play.google.com/store/apps/details?id=com.google.android.apps.magazines&hl=en&gl=US&pli=1) [@pulzarraider](https://github.com/pulzarraider)
- Add YaDirectFetcher, amaya

## [3.6.10](https://github.com/omrilotan/isbot/compare/v3.6.9...v3.6.10)

- Adjust the "client" substring pattern

## [3.6.9](https://github.com/omrilotan/isbot/compare/v3.6.8...v3.6.9)

- Adjust GOGGalaxy pattern
- Update built files

## [3.6.8](https://github.com/omrilotan/isbot/compare/v3.6.7...v3.6.8)

- Add Speedcurve: [Maximilian Haupt](https://github.com/0x7f)
- Exclude specific "client" substrings

## [3.6.7](https://github.com/omrilotan/isbot/compare/v3.6.6...v3.6.7)

- Add PhantomJS substring

## [3.6.6](https://github.com/omrilotan/isbot/compare/v3.6.5...v3.6.6)

- Add CryptoAPI to known bots list
- Add Pageburst

## [3.6.6](https://github.com/omrilotan/isbot/compare/v3.6.5...v3.6.6)

- Add CryptoAPI to known bots list

## [3.6.5](https://github.com/omrilotan/isbot/compare/v3.6.4...v3.6.5)

- Improvement: List reduced by >50 patterns for a better one-word pattern

## [3.6.4](https://github.com/omrilotan/isbot/compare/v3.6.3...v3.6.4)

- Add [Fuzz Faster U Fool](https://github.com/ffuf/ffuf)

## [3.6.3](https://github.com/omrilotan/isbot/compare/v3.6.2...v3.6.3)

- Adjust single word pattern: Add brackets

## [3.6.2](https://github.com/omrilotan/isbot/compare/v3.6.1...v3.6.2)

- Recognise Uptime-Kuma/1.18.0
- Reintroduce Yandex Search app exclusion

## [3.6.1](https://github.com/omrilotan/isbot/compare/v3.6.0...v3.6.1)

- Edit list and exception patterns (more bots, simpler pattern)

## [3.6.0](https://github.com/omrilotan/isbot/compare/v3.5.4...v3.6.0)

- Expose a copy of the regular expression pattern via isbot.pattern getter

## [3.5.4](https://github.com/omrilotan/isbot/compare/v3.5.3...v3.5.4)

- Add strings starting with the word "nginx"

## [3.5.3](https://github.com/omrilotan/isbot/compare/v3.5.2...v3.5.3)

- Fix for "Google Pixel" combination
- Add strings starting with "custom"

## [3.5.2](https://github.com/omrilotan/isbot/compare/v3.5.1...v3.5.2)

- Build supports more interpolation (transform class etc.)

## [3.5.1](https://github.com/omrilotan/isbot/compare/v3.5.0...v3.5.1)

- Add SERP (Search Engine Results Pages) Reputation Management tools

## [3.5.0](https://github.com/omrilotan/isbot/compare/v3.4.8...v3.5.0)

- Specify browser and node entries for require and import (resolves issue with jest 28)

## [3.4.8](https://github.com/omrilotan/isbot/compare/v3.4.7...v3.4.8)

- Replace single space pattern with literal white space, which is more efficient
- Add a more generic identifier to simplified user agent names

## [3.4.7](https://github.com/omrilotan/isbot/compare/v3.4.6...v3.4.7)

- Add Zoom Webhook

## [3.4.6](https://github.com/omrilotan/isbot/compare/v3.4.5...v3.4.6)

- Add nodejs native agent (undici)
- Add random long string

## [3.4.5](https://github.com/omrilotan/isbot/compare/v3.4.4...v3.4.5)

- Add CF-UC web crawler
- Add TagInspector
- Add Request-Pomise

## [3.4.4](https://github.com/omrilotan/isbot/compare/v3.4.3...v3.4.4)

- Add [Morningscore](https://morningscore.io/)

## [3.4.3](https://github.com/omrilotan/isbot/compare/v3.4.2...v3.4.3)

- Add Postman

## [3.4.2](https://github.com/omrilotan/isbot/compare/v3.4.1...v3.4.2)

- Add generic term: "proxy"
- Optimise "email" rule
- Add Rexx

## [3.4.1](https://github.com/omrilotan/isbot/compare/v3.4.0...v3.4.1)

- Add recognised bots user agent patterns

## [3.4.0](https://github.com/omrilotan/isbot/compare/v3.3.4...v3.4.0)

- Add "matches" and "clear" to interface
- Recognise axios/ user agent as bot

## [3.3.4](https://github.com/omrilotan/isbot/compare/v3.3.3...v3.3.4)

- Add "package.json" to exports ([#165](https://github.com/omrilotan/isbot/pull/165)) by [javivelasco](https://github.com/omrilotan/isbot/commits?author=javivelasco)

## [3.3.3](https://github.com/omrilotan/isbot/compare/v3.3.2...v3.3.3)

- Add generic patterns (name/version) reduces pattern list size by >20%
- Internal formatting

## [3.3.2](https://github.com/omrilotan/isbot/compare/v3.3.1...v3.3.2)

- Remove const keyword from build (Fix)

## [3.3.1](https://github.com/omrilotan/isbot/compare/v3.3.0...v3.3.1)

- Fix in type definition

## [3.3.0](https://github.com/omrilotan/isbot/compare/v3.2.4...v3.3.0)

- Add "spawn" interface

## [3.2.4](https://github.com/omrilotan/isbot/compare/v3.2.3...v3.2.4)

- Add some RSS readers detection

## [3.2.3](https://github.com/omrilotan/isbot/compare/v3.2.2...v3.2.3)

- Refine amiga user agent detection

## [3.2.2](https://github.com/omrilotan/isbot/compare/v3.2.1...v3.2.2)

- One mode duckduckgo pattern

## [3.2.1](https://github.com/omrilotan/isbot/compare/v3.2.0...v3.2.1)

- Add bitdiscovery, Invision bot, ddg_android (duckduckgo), Braze, [gobuster](https://github.com/OJ/gobuster)

## [3.2.0](https://github.com/omrilotan/isbot/compare/v3.1.0...v3.2.0)

### New features

- Typescript definition (isbot) supports any. Where a non-string argument is cast to a string before execution

## [3.1.0](https://github.com/omrilotan/isbot/compare/v3.0.27...v3.1.0)

### New features

- Native support for ESM and CommonJS
- Start maintaining a security policy

### List updates

- Remove WAPCHOI from bot list
- Recognise Google/google user agent for Android webview

## [3.0.27](https://github.com/omrilotan/isbot/compare/v3.0.26...v3.0.27)

- Add a few known crawlers

## [3.0.26](https://github.com/omrilotan/isbot/compare/v3.0.25...v3.0.26)

- Open source projects with indication to github.com

## [3.0.25](https://github.com/omrilotan/isbot/compare/v3.0.24...v3.0.25)

- Address webview "Channel/googleplay", "GoogleApp/"
- Add 4 more bot patterns
- Stop treating Splash browser as bot

## [3.0.24](https://github.com/omrilotan/isbot/compare/v3.0.23...v3.0.24)

- Add Prometheus new user agent (prometheus)
- Add RestSharp .NET HTTP client
- Add M2E Pro Cron Service
- Add Deluge
- Deprecate asafaweb.com (EOL)

## [3.0.23](https://github.com/omrilotan/isbot/compare/v3.0.22...v3.0.23)

- Recognise Mozilla MozacFetch as natural non bot browser

## [3.0.22](https://github.com/omrilotan/isbot/compare/v3.0.21...v3.0.22)

- Add generic term: "manager"

## [3.0.21](https://github.com/omrilotan/isbot/compare/v3.0.20...v3.0.21)

- Reduce pattern complexity

## [3.0.20](https://github.com/omrilotan/isbot/compare/v3.0.19...v3.0.20)

- Add Anonymous and bit.ly

## [3.0.19](https://github.com/omrilotan/isbot/compare/v3.0.18...v3.0.19)

- Fix: It's not needed to download fixtures at postinstall

## [3.0.18](https://github.com/omrilotan/isbot/compare/v3.0.17...v3.0.18)

- Add [AngleSharp parser](https://github.com/AngleSharp/AngleSharp)
- Some Maintenance

## [3.0.17](https://github.com/omrilotan/isbot/compare/v3.0.16...v3.0.17)

- Add Neustar WPM
- Internal change accommodates TypeScript compiler

## [3.0.16](https://github.com/omrilotan/isbot/compare/v3.0.15...v3.0.16)

- Add pagespeed (Serf)
- Add SmallProxy
- Add CaptiveNetworkSupport

## [3.0.15](https://github.com/omrilotan/isbot/compare/v3.0.14...v3.0.15)

- Recognise a bunch of more bots
- Optimise some of the list so we still have the same length

## [3.0.14](https://github.com/omrilotan/isbot/compare/v3.0.13...v3.0.14)

- Add Gozilla
- Add PerimeterX Integration Services

## [3.0.13](https://github.com/omrilotan/isbot/compare/v3.0.12...v3.0.13)

- Add Kubernetes probe bot (ping and health-check) @simonecorsi

## [3.0.12](https://github.com/omrilotan/isbot/compare/v3.0.11...v3.0.12)

- Add [Discourse onebox](https://github.com/discourse/onebox) is used for link preview generation
- [Alexa Voice Service](https://github.com/alexa/avs-device-sdk)
- Reduce complexity by funding more common patterns

## [3.0.11](https://github.com/omrilotan/isbot/compare/v3.0.10...v3.0.11)

- Add 5538 known crawler user agent strings from [myip.ms](https://www.myip.ms)
- Reduce complexity by 79 by introducing "https?:" pattern

## [3.0.10](https://github.com/omrilotan/isbot/compare/v3.0.9...v3.0.10)

- Add [Sistrix (SEO)](https://www.sistrix.com/)
- JavaOS (Discontinued in 2003)

## [3.0.9](https://github.com/omrilotan/isbot/compare/v3.0.8...v3.0.9)

- Add Shared Web Credentials tool
- Add Java runtime request
- Add [2GDPR](https://2gdpr.com/)
- Add GetRight
- Add [Pompos](http://pompos.iliad.fr)

## [3.0.8](https://github.com/omrilotan/isbot/compare/v3.0.7...v3.0.8)

- Add [SignalR client](https://github.com/dotnet/aspnetcore/search?q=signalr&unscoped_q=signalr)
- Add FirePHP
- Reduce complexity for UAs containing "amiga" (by 3)
- Reduce complexity for UAs containing "download" (by 2)

## [3.0.7](https://github.com/omrilotan/isbot/compare/v3.0.6...v3.0.7)

- Reduce pattern complexity by 14

## [3.0.6](https://github.com/omrilotan/isbot/compare/v3.0.5...v3.0.6)

- Respond to crawler user agents added to user-agents.net/bots
- ApplicationHealthService: Ping Service

## [3.0.5](https://github.com/omrilotan/isbot/compare/v3.0.4...v3.0.5)

- Respond to crawler user agents added to user-agents.net/bots
- Add [Rigor synthetic monitoring](https://rigor.com/)

## [3.0.4](https://github.com/omrilotan/isbot/compare/v3.0.3...v3.0.4)

- [`Hexometer`](https://hexometer.com/)
- Respond to crawler user agents added to user-agents.net/bots
- Add an "ignoreList" to exclude user agents from user-agents.net

## [3.0.3](https://github.com/omrilotan/isbot/compare/v3.0.2...v3.0.3)

### Add bots

- Respond to crawler user agents added to user-agents.net/bots

## [3.0.2](https://github.com/omrilotan/isbot/compare/v3.0.1...v3.0.2)

### Optimise pattern list

Combine all google products: Google browsers' user agent do not contain the word "Google".

### Add bots

- M4A1-WAPCHOI/2.0 (Java; U; MIDP-2.0; vi; NokiaC5-00.2) WAPCHOI/1.0.0 UCPro/9.4.1.377 U2/1.0.0 Mobile UNTRUSTED/1.0 3gpp-gba
- Mozilla/5.0 (compatible; Domains Project/1.0.3; +https://github.com/tb0hdan/domains)

Overall reduces list by 25 rules (from 345 rules to 320)

## [3.0.1](https://github.com/omrilotan/isbot/compare/v3.0.0...v3.0.1)

### Crawlers list update

Add patterns for:

- Google WebLight Proxy
- HighWinds Content Delivery System
- [Hydra by addthis](https://github.com/addthis/hydra)
- [RebelMouse](https://www.rebelmouse.com/rebelmouse-public-api)
- Scanners: Jorgee Vulnerability, ClamAV Website, Burp Collaborator
- Monitoring services: Xymon, AlertSite, Hobbit, updown.io, Monit, Dotcom

### Testing

Add some legit browser user-agent strings
Fix periodic tests environment
Add [a tester page](https://isbot.js.org) to check user agents easily

## [3.0.0: Maintainability and performance through automation](https://github.com/omrilotan/isbot/compare/v2.5.6...v3.0.0)

The API and code **has not changed**

### Breaking changes

- Remove testing on node 6 and 8
- Some crawlers list updates can potentially change identification

### Non breaking changes

- Improve efficiency of rule by optimising some parts and **removing** others

### Testing

- Automatically download crawlers lists for verification
- Add tests to improve efficiency
