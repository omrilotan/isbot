# isbot

### install

    npm install isbot --save

### usage

    isBot(req.headers['user-agent'])

    isBot("Googlebot/2.1 (+http://www.google.com/bot.html)") // Googlebot

    isBot("Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36") // false

