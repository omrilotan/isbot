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
