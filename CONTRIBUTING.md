# Thank you for your contribution, Human

First off, thank you for taking the time to contribute! I appreciate it 🤩

## Make a Suggestion, Relay an Insight, Complain, Open an Issue

Anything you want to say is welcome - as long as you are considerate of other people and express yourself with dignity.

Please feel free to [open an issue](https://github.com/omrilotan/isbot/issues/new/choose).

## Pattern verification tests

Prepare lists of user agent strings before testing
```js
npm run prepare -- -f
```

### Lists
- Manual legit browsers list: [fixtures/browsers.yml](https://github.com/omrilotan/isbot/blob/main/fixtures/browsers.yml)
- Manual known crawlers list: [fixtures/crawlers.yml](https://github.com/omrilotan/isbot/blob/main/fixtures/crawlers.yml)
- Downloaded resources end up in [fixtures/downloads](https://github.com/omrilotan/isbot/blob/main/fixtures/downloads) folder
- [user-agents](https://www.npmjs.com/package/user-agents) package is used to add randomly generated browser user agents

### Misidentification

A user agent string may be legit even if it is included in one of the automated download lists in. To explicitly exclude it, add it to [fixtures/browsers.yml](https://github.com/omrilotan/isbot/blob/main/fixtures/browsers.yml).

A user agent string may be a bot even if it was generated by [user-agents](https://www.npmjs.com/package/user-agents). To explicitly include it, add it to [fixtures/crawlers.yml](https://github.com/omrilotan/isbot/blob/main/fixtures/crawlers.yml).