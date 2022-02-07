# Changelog

## [3.4.2](https://github.com/omrilotan/isbot/compare/v3.4.1...v3.4.2)
-   Add generic term: "proxy"
-   Optimise "email" rule
-   Add Rexx

## [3.4.1](https://github.com/omrilotan/isbot/compare/v3.4.0...v3.4.1)
-   Add recognised bots user agent patterns

## [3.4.0](https://github.com/omrilotan/isbot/compare/v3.3.4...v3.4.0)
-   Add "matches" and "clear" to interface
-   Recognise axios/ user agent as bot

## [3.3.4](https://github.com/omrilotan/isbot/compare/v3.3.3...v3.3.4)
-   Add "package.json" to exports ([#165](https://github.com/omrilotan/isbot/pull/165)) by [javivelasco](https://github.com/omrilotan/isbot/commits?author=javivelasco)

## [3.3.3](https://github.com/omrilotan/isbot/compare/v3.3.2...v3.3.3)
-   Add generic patterns (name/version) reduces pattern list size by >20%
-   Internal formatting

## [3.3.2](https://github.com/omrilotan/isbot/compare/v3.3.1...v3.3.2)
-   Remove const keyword from build (Fix)

## [3.3.1](https://github.com/omrilotan/isbot/compare/v3.3.0...v3.3.1)
-   Fix in type definition

## [3.3.0](https://github.com/omrilotan/isbot/compare/v3.2.4...v3.3.0)
-   Add "spawn" interface

## [3.2.4](https://github.com/omrilotan/isbot/compare/v3.2.3...v3.2.4)
-   Add some RSS readers detection

## [3.2.3](https://github.com/omrilotan/isbot/compare/v3.2.2...v3.2.3)
-   Refine amiga user agent detection

## [3.2.2](https://github.com/omrilotan/isbot/compare/v3.2.1...v3.2.2)
-   One mode duckduckgo pattern

## [3.2.1](https://github.com/omrilotan/isbot/compare/v3.2.0...v3.2.1)
-   Add bitdiscovery, Invision bot, ddg_android (duckduckgo), Braze, [gobuster](https://github.com/OJ/gobuster)

## [3.2.0](https://github.com/omrilotan/isbot/compare/v3.1.0...v3.2.0)
### New features
-   Typescript definition (isbot) supports any. Where a non-string argument is cast to a string before execution

## [3.1.0](https://github.com/omrilotan/isbot/compare/v3.0.27...v3.1.0)
### New features
-   Native support for ESM and CommonJS
-   Start maintaining a security policy

### List updates
-   Remove WAPCHOI from bot list
-   Recognise Google/google user agent for Android webview

## [3.0.27](https://github.com/omrilotan/isbot/compare/v3.0.26...v3.0.27)
-   Add a few known crawlers

## [3.0.26](https://github.com/omrilotan/isbot/compare/v3.0.25...v3.0.26)
-   Open source projects with indication to github.com

## [3.0.25](https://github.com/omrilotan/isbot/compare/v3.0.24...v3.0.25)
-   Address webview "Channel/googleplay", "GoogleApp/"
-   Add 4 more bot patterns
-   Stop treating Splash browser as bot

## [3.0.24](https://github.com/omrilotan/isbot/compare/v3.0.23...v3.0.24)
-   Add Prometheus new user agent (prometheus)
-   Add RestSharp .NET HTTP client
-   Add M2E Pro Cron Service
-   Add Deluge
-   Deprecate asafaweb.com (EOL)

## [3.0.23](https://github.com/omrilotan/isbot/compare/v3.0.22...v3.0.23)
-   Recognise Mozilla MozacFetch as natural non bot browser

## [3.0.22](https://github.com/omrilotan/isbot/compare/v3.0.21...v3.0.22)
-   Add generic term: "manager"

## [3.0.21](https://github.com/omrilotan/isbot/compare/v3.0.20...v3.0.21)
-   Reduce pattern complexity

## [3.0.20](https://github.com/omrilotan/isbot/compare/v3.0.19...v3.0.20)
-   Add Anonymous and bit.ly

## [3.0.19](https://github.com/omrilotan/isbot/compare/v3.0.18...v3.0.19)
-   Fix: It's not needed to download fixtures at postinstall

## [3.0.18](https://github.com/omrilotan/isbot/compare/v3.0.17...v3.0.18)
-   Add [AngleSharp parser](https://github.com/AngleSharp/AngleSharp)
-   Some Maintenance

## [3.0.17](https://github.com/omrilotan/isbot/compare/v3.0.16...v3.0.17)
-   Add Neustar WPM
-   Internal change accommodates TypeScript compiler

## [3.0.16](https://github.com/omrilotan/isbot/compare/v3.0.15...v3.0.16)
-   Add pagespeed (Serf)
-   Add SmallProxy
-   Add CaptiveNetworkSupport

## [3.0.15](https://github.com/omrilotan/isbot/compare/v3.0.14...v3.0.15)
-   Recognise a bunch of more bots
-   Optimise some of the list so we still have the same length

## [3.0.14](https://github.com/omrilotan/isbot/compare/v3.0.13...v3.0.14)
-   Add Gozilla
-   Add PerimeterX Integration Services

## [3.0.13](https://github.com/omrilotan/isbot/compare/v3.0.12...v3.0.13)
-   Add Kubernetes probe bot (ping and health-check) @simonecorsi

## [3.0.12](https://github.com/omrilotan/isbot/compare/v3.0.11...v3.0.12)
-   Add [Discourse onebox](https://github.com/discourse/onebox) is used for link preview generation
-   [Alexa Voice Service](https://github.com/alexa/avs-device-sdk)
-   Reduce complexity by funding more common patterns

## [3.0.11](https://github.com/omrilotan/isbot/compare/v3.0.10...v3.0.11)
-   Add 5538 known crawler user agent strings from [myip.ms](https://www.myip.ms)
-   Reduce complexity by 79 by introducing "https?:" pattern

## [3.0.10](https://github.com/omrilotan/isbot/compare/v3.0.9...v3.0.10)
-   Add [Sistrix (SEO)](https://www.sistrix.com/)
-   JavaOS (Discontinued in 2003)

## [3.0.9](https://github.com/omrilotan/isbot/compare/v3.0.8...v3.0.9)
-   Add Shared Web Credentials tool
-   Add Java runtime request
-   Add [2GDPR](https://2gdpr.com/)
-   Add GetRight
-   Add [Pompos](http://pompos.iliad.fr)

## [3.0.8](https://github.com/omrilotan/isbot/compare/v3.0.7...v3.0.8)
-   Add [SignalR client](https://github.com/dotnet/aspnetcore/search?q=signalr&unscoped_q=signalr)
-   Add FirePHP
-   Reduce complexity for UAs containing "amiga" (by 3)
-   Reduce complexity for UAs containing "download" (by 2)

## [3.0.7](https://github.com/omrilotan/isbot/compare/v3.0.6...v3.0.7)
-   Reduce pattern complexity by 14

## [3.0.6](https://github.com/omrilotan/isbot/compare/v3.0.5...v3.0.6)
-   Respond to crawler user agents added to user-agents.net/bots
-   ApplicationHealthService: Ping Service

## [3.0.5](https://github.com/omrilotan/isbot/compare/v3.0.4...v3.0.5)
-   Respond to crawler user agents added to user-agents.net/bots
-   Add [Rigor synthetic monitoring](https://rigor.com/)

## [3.0.4](https://github.com/omrilotan/isbot/compare/v3.0.3...v3.0.4)
-   [`Hexometer`](https://hexometer.com/)
-   Respond to crawler user agents added to user-agents.net/bots
-   Add an "ignoreList" to exclude user agents from user-agents.net

## [3.0.3](https://github.com/omrilotan/isbot/compare/v3.0.2...v3.0.3)

### Add bots
-   Respond to crawler user agents added to user-agents.net/bots

## [3.0.2](https://github.com/omrilotan/isbot/compare/v3.0.1...v3.0.2)

### Optimise pattern list
Combine all google products: Google browsers' user agent do not contain the word "Google".

### Add bots
-   M4A1-WAPCHOI/2.0 (Java; U; MIDP-2.0; vi; NokiaC5-00.2) WAPCHOI/1.0.0 UCPro/9.4.1.377 U2/1.0.0 Mobile UNTRUSTED/1.0 3gpp-gba
-   Mozilla/5.0 (compatible; Domains Project/1.0.3; +https://github.com/tb0hdan/domains)

Overall reduces list by 25 rules (from 345 rules to 320)

## [3.0.1](https://github.com/omrilotan/isbot/compare/v3.0.0...v3.0.1)

### Crawlers list update
Add patterns for:
-   Google WebLight Proxy
-   HighWinds Content Delivery System
-   [Hydra by addthis](https://github.com/addthis/hydra)
-   [RebelMouse](https://www.rebelmouse.com/rebelmouse-public-api)
-   Scanners: Jorgee Vulnerability, ClamAV Website, Burp Collaborator
-   Monitoring services: Xymon, AlertSite, Hobbit, updown.io, Monit, Dotcom

### Testing
Add some legit browser user-agent strings
Fix periodic tests environment
Add [a tester page](https://isbot.js.org) to check user agents easily

## [3.0.0: Maintainability and performance through automation](https://github.com/omrilotan/isbot/compare/v2.5.6...v3.0.0)

The API and code **has not changed**

### Breaking changes
-   Remove testing on node 6 and 8
-   Some crawlers list updates can potentially change identification

### Non breaking changes
-   Improve efficiency of rule by optimising some parts and **removing** others

### Testing
-   Automatically download crawlers lists for verification
-   Add tests to improve efficiency
