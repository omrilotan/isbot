var list = require('./list');
var regex = new RegExp('(' + list.join('|') + ')', 'ig');

module.exports = function(userAgent) {
    regex.lastIndex = 0;
    return regex.test(userAgent);
};
