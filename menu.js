var menu = (function () {
  var mainMenu = function mainMenu() {
    console.log("Menu");
    console.log("-------------");
    console.log("A: Roll up a new player character");
    console.log("B: Nothing");
    console.log("C: Nothing");
    console.log("D: Roll 3d6");
    console.log("E: Test roll function: roll 3d4");
    console.log("F: Test table load functionality");
    console.log("S: Start server on http://localhost:3000")
    console.log("M: Menu");
    console.log("Q: Quit");
  };

  return {
    mainMenu: mainMenu
  }
}());

module.exports = menu;
