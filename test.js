var fs = require('fs');
var path = require('path');
var chai = require("chai");
chai.should();

var crawlersFile = path.join(__dirname, 'crawlers.txt');
var browsersFile = path.join(__dirname, 'browsers.txt');
var crawlers = fs.readFileSync(crawlersFile, 'utf-8').trim().split('\n');
var browsers = fs.readFileSync(browsersFile, 'utf-8').trim().split('\n');
var isBot = require('./');
var customBrowser = 'Mozilla/5.0';
var extendList = ['^mozilla/\\d\\.\\d$'];

describe('Crawlers:', function() {
    crawlers.forEach(function(bot) {
        it('should detect (' + bot + ') as bot', function() {
            isBot(bot).should.be.true;
        });
    });
});

describe('Browsers:', function() {
    browsers.forEach(function(browser) {
        it('should not be detected (' + browser + ') as bot', function() {
            isBot(browser).should.be.false;
        });
    });
});

describe('Extend', function(){
    it('should not be detected (' + customBrowser + ') as bot', function() {
        isBot(customBrowser).should.be.false;
    });

    it('should be detected (' + customBrowser + ') as bot', function() {
        isBot.extend(extendList);
        isBot(customBrowser).should.be.true;
    });
});

describe('Exclude', function(){
    var cubot = 'Mozilla/5.0 (Linux; Android 8.0.0; CUBOT_P20) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Mobile Safari/537.36';
    var excludedFilters = ['bot'];

    afterEach(function() {
        delete require.cache[require.resolve('./')];
        delete require.cache[require.resolve('./list')];
        isBot = require('./');
    });

    it('should detect Cubot as bot', function() {
        isBot(cubot).should.be.true;
    });

    it('should not detect Cubot as bot', function() {
        isBot.exclude(excludedFilters);
        isBot(cubot).should.be.false;
    });

    it('should detect Googlebot, but not Cubot (use case)', function() {
        isBot('Googlebot').should.be.true;
        isBot(cubot).should.be.true;

        isBot.exclude(excludedFilters);
        isBot.extend(['googlebot']);

        isBot('Googlebot').should.be.true;
        isBot(cubot).should.be.false;
    });
});

describe('redundant crawler rules', function(){
    after(function() {
        delete require.cache[require.resolve('./')];
        delete require.cache[require.resolve('./list')];
    });

    var list = require('./list.json').slice();
    var rule;

    while (rule = list.pop()) {
        it('needs rule [' + rule +']', function() {
            isBot.exclude([rule]);
            isBot(rule).should.be.false;
            isBot.extend([rule]);
        });
    }
});
