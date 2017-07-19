var express = require('express');

var expressServer = (function() {
  var app = express();
  var isRunning = false;

  var startServer = function(characterBuilder) {
    console.log("Starting server");
    app.set('port', process.env.PORT || 3000);

    app.listen(app.get('port'), function() {
      console.log("Started server on http://localhost:" + app.get('port'));
    });

    app.use(express.static('public'));

    app.get('/', function(req, res) {
      res.type('text/plain');
      res.send('AD&D GM support system v1.0');
    });

    // Returns a JSON object with a AD&D character
    app.get('/character', function(req,res) {
      res.type('text/json');
      res.send(characterBuilder.generateStats());
    });

    isRunning = true;
    return this;
  };

  var stopServer = function() {
    console.log("Stopping server");
    isRunning = false;
  };

  var status = function() {
    return isRunning;
  };

  return {
    startServer: startServer,
    stopServer: stopServer,
    status: status
  }
})();
module.exports = expressServer;