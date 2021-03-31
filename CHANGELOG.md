# 3.0.26
- Open source projects with indication to github.com

# 3.0.25
- Address webview "Channel/googleplay", "GoogleApp/"
- Add 4 more bot patterns
- Stop treating Splash browser as bot

# 3.0.24
- Add Prometheus new user agent (prometheus)
- Add RestSharp .NET HTTP client
- Add M2E Pro Cron Service
- Add Deluge
- Deprecate asafaweb.com (EOL)

# 3.0.23
- Recognise Mozilla MozacFetch as natural non bot browser

# 3.0.22
- Add generic term: "manager"

# 3.0.21
- Reduce pattern complexity

# 3.0.20
- Add Anonymous and bit.ly

# 3.0.19
- Fix: It's not needed to download fixtures at postinstall

# 3.0.18
- Add [AngleSharp parser](https://github.com/AngleSharp/AngleSharp)
- Some Maintenance

# 3.0.17
- Add Neustar WPM
- Internal change accommodates TypeScript compiler

# 3.0.16
- Add pagespeed (Serf)
- Add SmallProxy
- Add CaptiveNetworkSupport

# 3.0.15
- Recognise a bunch of more bots
- Optimise some of the list so we still have the same length

# 3.0.14
- Add Gozilla
- Add PerimeterX Integration Services

# 3.0.13
- Add Kubernetes probe bot (ping and health-check) @simonecorsi

# 3.0.12
- Add [Discourse onebox](https://github.com/discourse/onebox) is used for link preview generation
- [Alexa Voice Service](https://github.com/alexa/avs-device-sdk)
- Reduce complexity by funding more common patterns

# 3.0.11
- Add 5538 known crawler user agent strings from [myip.ms](https://www.myip.ms)
- Reduce complexity by 79 by introducing "https?:" pattern

# 3.0.10
- Add [Sistrix (SEO)](https://www.sistrix.com/)
- JavaOS (Discontinued in 2003)

# 3.0.9
- Add Shared Web Credentials tool
- Add Java runtime request
- Add [2GDPR](https://2gdpr.com/)
- Add GetRight
- Add [Pompos](http://pompos.iliad.fr)

# 3.0.8
- Add [SignalR client](https://github.com/dotnet/aspnetcore/search?q=signalr&unscoped_q=signalr)
- Add FirePHP
- Reduce complexity for UAs containing "amiga" (by 3)
- Reduce complexity for UAs containing "download" (by 2)

# 3.0.7
- Reduce pattern complexity by 14

# 3.0.6
- Respond to crawler user agents added to user-agents.net/bots
- ApplicationHealthService: Ping Service

# 3.0.5
- Respond to crawler user agents added to user-agents.net/bots
- Add [Rigor synthetic monitoring](https://rigor.com/)

# 3.0.4
- [`Hexometer`](https://hexometer.com/)
- Respond to crawler user agents added to user-agents.net/bots
- Add an "ignoreList" to exclude user agents from user-agents.net

# 3.0.3

## Add bots
- Respond to crawler user agents added to user-agents.net/bots

# 3.0.2

## Optimise pattern list
Combine all google products: Google browsers' user agent do not contain the word "Google".

## Add bots
- M4A1-WAPCHOI/2.0 (Java; U; MIDP-2.0; vi; NokiaC5-00.2) WAPCHOI/1.0.0 UCPro/9.4.1.377 U2/1.0.0 Mobile UNTRUSTED/1.0 3gpp-gba
- Mozilla/5.0 (compatible; Domains Project/1.0.3; +https://github.com/tb0hdan/domains)

Overall reduces list by 25 rules (from 345 rules to 320)

# 3.0.1

## Crawlers list update
Add patterns for:
- Google WebLight Proxy
- HighWinds Content Delivery System
- [Hydra by addthis](https://github.com/addthis/hydra)
- [RebelMouse](https://www.rebelmouse.com/rebelmouse-public-api)
- Scanners: Jorgee Vulnerability, ClamAV Website, Burp Collaborator
- Monitoring services: Xymon, AlertSite, Hobbit, updown.io, Monit, Dotcom

## Testing
Add some legit browser user-agent strings
Fix periodic tests environment
Add [a tester page](https://isbot.js.org) to check user agents easily

# 3.0.0: Maintainability and performance through automation

The API and code **has not changed**

## Breaking changes
- Remove testing on node 6 and 8
- Some crawlers list updates can potentially change identification

## Non breaking changes
- Improve efficiency of rule by optimising some parts and **removing** others

## Testing
- Automatically download crawlers lists for verification
- Add tests to improve efficiency
