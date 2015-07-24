var list = require('./list');
var regExp = new RegExp('(' + list.join('|') + ')', 'ig');

module.exports = function(userAgent) {
    var match = userAgent.match(regExp);
    if (match && match.length > 0) {
        return match[0];
    }
    return false;
};