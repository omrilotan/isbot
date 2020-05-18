# next

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
