var list = require('./list');
var regex = new RegExp('(' + list.join('|') + ')', 'ig');

module.exports = function(userAgent) {
    var match = userAgent.match(regex);
    if (match && match.length) return match[0];
    return false;
};
