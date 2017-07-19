var mathHelp = require('./mathHelp');
var dice = (function() {

  var d6 = function() {
    return mathHelp.randomInt(1, 7);
  };

  var r3d6 = function() {
      return d6()+d6()+d6();
  };

  return {
    d6: d6,
    r3d6, r3d6
  };
}());

module.exports = dice;
