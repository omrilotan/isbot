var list = require('./list');
var regex = new RegExp('(' + list.join('|') + ')', 'i');

module.exports = function(userAgent) {
    return regex.test(userAgent);
};

module.exports.extend = function(additionalFilters){
    list = list.concat(additionalFilters);
    regex = new RegExp('(' + list.join('|') + ')', 'i');
}
