var menu = (function () {
  var mainMenu = function mainMenu() {
    console.log("Menu");
    console.log("-------------");
    console.log("A: Roll up a new player character");
    console.log("B: Roll for a common treasure");
    console.log("C: Unknown");
    console.log("D: Roll 3d6");
    console.log("M: Menu");
    console.log("Q: Quit");
  };

  return {
    mainMenu: mainMenu
  }
}());

module.exports = menu;