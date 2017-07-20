var fs = require('fs');
var parse = require('csv-parse');

var tableReader = (function() {
  var attribute = 'none';
  var attributeAdjustments = [];
  var firstRow = true;

  var readTableForAttribute = function(stats, filename) {
    fs.createReadStream(filename).pipe(parse({ delimiter: ','})
    .on('data', function(line) {
        if (firstRow) {
          attribute = line[0];
          attributeAdjustments = line.slice(1);
          firstRow = false;
        } else {
          doTableRowWork(stats, line, attribute, attributeAdjustments);
        }
      })
    .on('end', function() {
      console.log(stats);
      return stats;
    }));
  }

  var doTableRowWork = function(stats, line, attribute, attributeAdjustments) {
    if (stats[attribute] == line[0]) {
          for (var i =0;i<attributeAdjustments.length;i++) {
            stats[attributeAdjustments[i]] = line[i+1];
          }
    }
    return stats;
  }

  return {
    readTableForAttribute: readTableForAttribute,
  };
})();

module.exports = tableReader;
