var fs = require('fs');
var parse = require('csv-parse');

var tableReader = (function() {
  var attribute = 'none';
  var attributeAdjustments = [];
  var firstRow = true;

  var readTableForAttribute = function(stats, filename) {
    var firstRow = true;
    var csvFile = fs.readFileSync(filename,'utf8');
    csvFile.split('\n').forEach(function (line) {
      var line = line.split(',');
      if (firstRow) {
        attribute = line[0];
        attributeAdjustments = line.slice(1);
        firstRow = false;
      } else {
        doTableRowWork(stats, line, attribute, attributeAdjustments);
      }
    });
    return stats;
  }

  var doTableRowWork = function(stats, line, attribute, attributeAdjustments) {
    if (stats[attribute] == line[0]) {
          for (var i =0;i<attributeAdjustments.length;i++) {
            stats[attributeAdjustments[i].trim()] = line[i+1].trim();
          }
    }
    return stats;
  }

  return {
    readTableForAttribute: readTableForAttribute,
  };
})();

module.exports = tableReader;
