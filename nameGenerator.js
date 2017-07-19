var mathHelp = require('./mathHelp');
var nameGenerator = (function() {
  var firstNameFirst = [ "La", "Me", "Fi", "Ra", "Ber", "I", "Jee", "Ali", "Fru", "Mar", "Na", "El", "Nu", "Gal", "Sul-ba-"];
  var firstNameSecond = [ "di", "ro", "xu", "ka", "hama", "chibero", "do", "lo", "kalo", "lia"]
  var firstNameLast = ["ros", "goa", "xin", "roo", "datch", "lupp", "herobo", "-appo", "s", "tt", "tret"];
  var places = ["Hemboo", "Wathrobia", "Galubaria", "the Burning forest", "Waterdeep", "Axiria", "under the sea", "Gamorora", "Felexx"];
  var extraStrong = ["very", "somewhat", "incredibly", "not so", "unsuccessful and", "quite", "sometimes"];
  var prop = ["brutal", "strong", "angry", "embarrasing", "slippery", "free", "hairy", "fat", "lying bastard", "funny", "boring"];

  var generateName = function() {
        var name = firstNameFirst[mathHelp.randomInt(0, firstNameFirst.length)] + firstNameSecond[mathHelp.randomInt(0, firstNameSecond.length)] + firstNameLast[mathHelp.randomInt(0, firstNameLast.length)];
        var add = mathHelp.randomInt(0, 10);
        if (add === 2) {
          name = name + " from " + places[mathHelp.randomInt(0,places.length)];
        } else if (add > 7) {
          name = name + " the ";
          if (add > 8) {
            name = name + extraStrong[mathHelp.randomInt(0,extraStrong.length)] + " ";
          }
          name = name + prop[mathHelp.randomInt(0,prop.length)];
        }
        return name;
  };
  return {
    generateName: generateName
  };
})();
module.exports = nameGenerator;