var fs = require('fs');
var path = require('path');
var chai = require("chai");
chai.should();

var crawlersFile = path.join(__dirname, 'crawlers.txt');
var browsersFile = path.join(__dirname, 'browsers.txt');
var crawlers = fs.readFileSync(crawlersFile, 'utf-8').trim().split('\n');
var browsers = fs.readFileSync(browsersFile, 'utf-8').trim().split('\n');
var isBot = require('./');

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
