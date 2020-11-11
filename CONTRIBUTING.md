# Thank you for your contribution, Human

First off, thank you for taking the time to contribute! I appreciate it 🤩

## Make a Suggestion, Relay an Insight, Complain, Open an Issue

Anything you want to say is welcome - as long as you are considerate of other people and express yourself with dignity.

## Patterns are verified

Load updated lists of user agent strings for testing
```js
npm run prepare
```

Add a bot that's not included in these lists in [tests/fixtures/manual-crawlers-list.yml](https://github.com/omrilotan/isbot/blob/main/tests/fixtures/manual-crawlers-list.yml)

Add a user agent string that has been falsely identified as bot in [tests/fixtures/manual-legit-browsers.yml](https://github.com/omrilotan/isbot/blob/main/tests/fixtures/manual-legit-browsers.yml)

Add a user agent string that is legit even though it is included in one of the automated download lists in [tests/fixtures/user-agents.net-bots-ignore-list.txt](https://github.com/omrilotan/isbot/blob/main/tests/fixtures/user-agents.net-bots-ignore-list.txt)
