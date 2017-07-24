var menuBuilder = (function() {
  var getMenu = function() {
    return {
      'Home': {
        'Home': 'index.html',
        'About': 'about.html',
        'Contact us': 'contact.html',
      },
    };
  };
  return {
    getMenu: getMenu,
  };
})();
module.exports = menuBuilder;
