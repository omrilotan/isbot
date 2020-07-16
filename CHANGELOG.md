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
Add [a tester page](https://gorangajic.github.io/isbot) to check user agents easily

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
