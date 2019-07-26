var list = require('./list.json');
var regex;
function update() {
	regex = new RegExp('(' + list.join('|') + ')', 'i');
}
update();

module.exports = function(userAgent) {
    return regex.test(userAgent);
};

module.exports.extend = function(additionalFilters){
    list = list.concat(additionalFilters);
    update();
}

module.exports.exclude = function(excludedFilters){
    var i = excludedFilters.length;
    while (i--) {
      var index = list.lastIndexOf(excludedFilters[i]);
      if (index > 0) {
        list.splice(index, 1);
      }
    }
    update();
}
