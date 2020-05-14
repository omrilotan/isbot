echo "Download crawler list from user-agents.net"
curl -d 'browser_type=bot-crawler&download=txt' https://user-agents.net/download > tests/fixtures/user-agents.net.bot-crawler.txt

echo "Download crawler list from crawler-user-agents repo"
curl https://raw.githubusercontent.com/monperrus/crawler-user-agents/master/crawler-user-agents.json > tests/fixtures/crawler-user-agents-monperrus.json
