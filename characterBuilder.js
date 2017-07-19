var dice = require('./dice');
var mathHelp = require('./mathHelp');
var nameGenerator = require('./nameGenerator');

var characterBuilder = (function () {
  var generateStats = function() {
    var stats = { str: 0, int: 0, wis: 0, dex: 0, con: 0, cha: 0};
    stats.name = nameGenerator.generateName();
    stats.str = dice.r3d6();
    stats.int = dice.r3d6();
    stats.wis = dice.r3d6();
    stats.dex = dice.r3d6();
    stats.con = dice.r3d6();
    stats.chr = dice.r3d6();
    return enrichStats(stats);
  };

  var enrichStats = function(stats) {
    stats = enrichStatsStr(stats);
    stats = enrichStatsInt(stats);
    stats = finalizeCharacter(stats);
    return stats;
  };

  var finalizeCharacter = function(stats) {
    stats = getRace(stats);
    stats = getCharacterClass(stats);
    stats = getAlignment(stats);
    stats = getAge(stats);
    stats = getStatic(stats);
    return stats;
  }

  var getStatic = function(stats) {
    stats.level = 1;
    stats.playerName = "____________________________";
    stats.family = "von Neumann";
    stats.sex = ["Female","Male"][mathHelp.randomInt(0,2)];
    return stats;
  }

  var getAge = function(stats) {
    stats.age = 120;
    if (stats.race == "Human") {
      var baseAge = 18;
      switch (stats.class) {
        case "Fighter":
          baseAge = 15;
          baseAge += dice.d4();
          break;
        case "Paladin":
          baseAge = 17;
          baseAge += dice.d4();
          break;
        case "Ranger":
        case "Assassin":
          baseAge = 20;
          baseAge += dice.d4();
          break;
        case "Monk":
          baseAge = 21;
          baseAge += dice.d4();
          break;
        case "Magic-user":
          baseAge = 24;
          baseAge += dice.d8() + dice.d8();
          break;
        case "Illusionist":
          baseAge = 30;
          baseAge += dice.d6();
          break;
        default:
          baseAge += dice.d4();
      }
      stats.age = baseAge;
    } else if (stats.race == "Dwarf") {
      stats.age = 250 + dice.d20() + dice.d20();
    } else if (stats.race == "Elf") {
      stats.age = 500 + dice.r10d10();
    } else if (stats.race == "Gnome") {
      stats.age = 300 + dice.d12() + dice.d12() + dice.d12();
    } else if (stats.race == "Half-Elf") {
      stats.age = 40 + dice.d4() + dice.d4();
    } else if (stats.race == "Halfling") {
      stats.age = 20 + dice.d4() + dice.d4() + dice.d4();
    } else if (stats.race == "Half-Orc") {
      stats.age = 20 + dice.d4();
    }
    return stats;
  }

  var getAlignment = function(stats) {
    var goodEvil = ["good", "neutral", "evil"];
    var chaoticLawful = ["Lawful", "Neutral", "Chaotic"];

    switch (stats.class) {
      case "Paladin":
        stats.alignment = "Lawful good";
        break;
      case "Druid":
        stats.alignment = chaoticLawful[mathHelp.randomInt(0, chaoticLawful.length)] + " neutral";
        break;
      case "Ranger":
        stats.alignment = chaoticLawful[mathHelp.randomInt(0, chaoticLawful.length)] + " good";
        break;
      case "Assassin":
        stats.alignment = chaoticLawful[mathHelp.randomInt(0, chaoticLawful.length)] + " evil";
        break;
      case "Monk":
        stats.alignment = "Lawful " + goodEvil[mathHelp.randomInt(0, goodEvil.length)];
      case "Thief":
        goodEvil = removeFromArray(goodEvil, "good");
      default:
        stats.alignment = chaoticLawful[mathHelp.randomInt(0,chaoticLawful.length)] + " " + goodEvil[mathHelp.randomInt(0,goodEvil.length)];
    }
    if (stats.alignment == "Neutral neutral") {
      stats.alignment = "True neutral";
    }
    return stats;
  }

  var getRace = function(stats) {
    var races = ["Dwarf", "Elf", "Gnome", "Half-Elf", "Halfling", "Half-Orc", "Human"];
    var classes = ["Cleric", "Druid", "Fighter", "Paladin", "Ranger", "Magic-user", "Illusionist", "Thief", "Assassin", "Monk"];
    var raceCan = [
      [false, false, true, false, false, false, false, true, true, false], // Dwarf
      [false, false, true, false, false, true, false, true, true, false],  // Elf
      [false, false, true, false, false, false, true, true, true, false],  // Gnome
      [true, true, true, false, true, true, false, true, true, false],     // Half-Elf
      [false, false, true, false, false, false, false, true, false, false],// Halfling
      [true, false, true, false, false, false, false, true, true, false],  // Half-orc
      [true, true, true, true, true, true, true, true, true, true]];       // Human

    var whichRace = mathHelp.randomInt(0,races.length);
    stats.race = races[whichRace];
    stats.raceCan = [];
    for (var i=0;i<raceCan[0].length; i++) {
      if (raceCan[whichRace][i]) {
        stats.raceCan.push(classes[i]);
      }
    }
    return stats;
  }

  var removeFromArray = function(array, search_term) {
    var index = array.indexOf(search_term);    // <-- Not supported in <IE9
    if (index !== -1) {
        array.splice(index, 1);
    }
    return array;
  }

  var getCharacterClass = function(stats) {
    if (stats.canBeMagicUser === false) {
      stats.raceCan = removeFromArray(stats.raceCan, "Magic-user");
      stats.raceCan = removeFromArray(stats.raceCan, "Illusionist");
    }
    stats.class = stats.raceCan[mathHelp.randomInt(0, stats.raceCan.length)];
    delete stats.raceCan;
    return stats;
  }

  var enrichStatsStr = function(stats) {
    switch (stats.str) {
      case 3:
        stats.hitProbability = -3;
        stats.damageAdjustment = -1;
        stats.weightAllowance = -350;
        stats.openDoorsOnA = '1';
        stats.bendBarsLiftGates = 0;
        break;
      case 4:
      case 5:
        stats.hitProbability = -2;
        stats.damageAdjustment = -1;
        stats.weightAllowance = -250;
        stats.openDoorsOnA = '1';
        stats.bendBarsLiftGates = 0;
        break;
      case 6:
      case 7:
        stats.hitProbability = -1;
        stats.damageAdjustment = 0;
        stats.weightAllowance = -150;
        stats.openDoorsOnA = '1';
        stats.bendBarsLiftGates = 0;
        break;
      case 8:
      case 9:
        stats.hitProbability = 0;
        stats.damageAdjustment = 0;
        stats.weightAllowance = 0;
        stats.openDoorsOnA = '1-2';
        stats.bendBarsLiftGates = 1;
        break;
      case 10:
      case 11:
        stats.hitProbability = 0;
        stats.damageAdjustment = 0;
        stats.weightAllowance = 0;
        stats.openDoorsOnA = '1-2';
        stats.bendBarsLiftGates = 2;
        break;
      case 12:
      case 13:
        stats.hitProbability = 0;
        stats.damageAdjustment = 0;
        stats.weightAllowance = 100;
        stats.openDoorsOnA = '1-2';
        stats.bendBarsLiftGates = 4;
        break;
      case 14:
      case 15:
        stats.hitProbability = 0;
        stats.damageAdjustment = 0;
        stats.weightAllowance = 200;
        stats.openDoorsOnA = '1-2';
        stats.bendBarsLiftGates = 7;
        break;
      case 16:
        stats.hitProbability = 0;
        stats.damageAdjustment = 1;
        stats.weightAllowance = 350;
        stats.openDoorsOnA = '1-3';
        stats.bendBarsLiftGates = 10;
        break;
      case 17:
        stats.hitProbability = 1;
        stats.damageAdjustment = 1;
        stats.weightAllowance = 500;
        stats.openDoorsOnA = '1-3';
        stats.bendBarsLiftGates = 13;
        break;
      case 18:
        stats.hitProbability = 1;
        stats.damageAdjustment = 2;
        stats.weightAllowance = 750;
        stats.openDoorsOnA = '1-3';
        stats.bendBarsLiftGates = 16;
        break;
    default:

    }
    return stats;
  };

  var enrichStatsInt = function(stats) {
    stats.canBeHalfElf = true;
    stats.canBeHalfling = true;
    stats.canBeGnome = true;
    stats.canBeElf = true;
    stats.canBeMagicUser = true;
    stats.chanceToKnowEachListedSpell = 0;
    switch (stats.int) {
      case 3:
        stats.canBeHalfElf = false;
      case 4:
      case 5:
        stats.canBeHalfling = false;
      case 6:
        stats.canBeGnome = false;
      case 7:
        stats.canBeElf = false;
        stats.additionalLanguages = 0;
        break;
      case 8:
        stats.canBeMagicUser = false;
      case 9:
        stats.chanceToKnowEachListedSpell = 35;
        stats.additionalLanguages = 1;
        break;
      case 10:
      case 11:
        stats.chanceToKnowEachListedSpell = 45;
        stats.additionalLanguages = 2;
        break;
      case 12:
        stats.chanceToKnowEachListedSpell = 45;
        stats.additionalLanguages = 3;
        break;
      case 13:
        stats.chanceToKnowEachListedSpell = 55;
        stats.additionalLanguages = 3;
        break;
      case 14:
        stats.chanceToKnowEachListedSpell = 55;
        stats.additionalLanguages = 4;
        break;
      case 15:
        stats.chanceToKnowEachListedSpell = 65;
        stats.additionalLanguages = 4;
        break;
      case 16:
        stats.chanceToKnowEachListedSpell = 65;
        stats.additionalLanguages = 5;
        break;
      case 17:
        stats.chanceToKnowEachListedSpell = 75;
        stats.additionalLanguages = 6;
        break;
      case 18:
        stats.chanceToKnowEachListedSpell = 85;
        stats.additionalLanguages = 7;
        break;
      default:

    }
    return stats;
  };

  return {
    generateStats: generateStats,
//    enrichStats: enrichStats,
//    enrichStatsStr: enrichStatsStr
  };
})();
module.exports = characterBuilder;
