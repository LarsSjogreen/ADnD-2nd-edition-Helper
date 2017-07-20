const readline = require('readline');
const dice = require('./dice');
const character = require('./characterBuilder');
const menu = require('./menu');
const server = require('./expressServer');

// Apologies for the crappy code. I didn't take time to refactor. I didn't write any tests.
// Based on AD&D Players Handbook 2nd edition
// And this one: http://www.seads.org/images/Chareter1.JPG

var serverInstance = false;

console.log("AD&D GM aid");

const r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

menu.mainMenu();
r1.setPrompt("> ");
r1.prompt();

r1.on('line', (line) => {
  line = line.toUpperCase();
  switch (line.trim()) {
    case "M":
      menu.mainMenu();
      break;
    case "A":
      var stats = character.generateStats();
      console.log(stats);
      break;
    case "B":
    case "C":
      console.log("Not done");
      break;
    case "D":
      console.log("Diceroll 3d6: " + dice.roll(3, dice.d6));
      break;
    case "E":
      console.log("Roll 3d4: " + dice.roll(3, dice.d4));
      break;
    case "S":
      serverInstance = server.startServer(character);
      break;
    case "Q":
      if (serverInstance !== false) {
        serverInstance.stopServer();
      }
      r1.close();
      process.exit(0);
    default:
      break;
  }
  r1.prompt()
}).on('close', () => {
  console.log("Bye");
  process.exit(0);
});
