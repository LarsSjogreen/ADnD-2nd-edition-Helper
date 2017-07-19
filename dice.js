var mathHelp = require('./mathHelp');
var dice = (function() {

  var d6 = function() {
    return mathHelp.randomInt(1, 7);
  };

  var d4 = function() {
    return mathHelp.randomInt(1, 5);
  };

  var d8 = function() {
    return mathHelp.randomInt(1, 9);
  };

  var d20 = function() {
    return mathHelp.randomInt(1,21);
  };

  var r3d6 = function() {
      return d6()+d6()+d6();
  };

  return {
    d4: d4,
    d6: d6,
    d8: d8,
    d20: d20,
    r3d6: r3d6
  };
}());

module.exports = dice;
