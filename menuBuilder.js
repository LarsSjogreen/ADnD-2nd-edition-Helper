var fs = require('fs');

var menuBuilder = (function() {
  var getMenu = function() {
    return loadMenu();
  };

  var loadMenu = function() {
    try {
      var menu = JSON.parse(fs.readFileSync('./menuDefinition.json'));      
    } catch (err) {
      console.log(err);
    }
    return menu;
  };

  return {
    getMenu: getMenu,
  };
})();
module.exports = menuBuilder;
