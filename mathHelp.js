var mathHelp = (function() {
  var randomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
  };

  return {
    randomInt: randomInt
  }
})();
module.exports = mathHelp;
