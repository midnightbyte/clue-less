var PlayerService = require('./playerService');
let ClientPlayer = require('../client/clientPlayer');


module.exports = function(io){
  let playerService = new PlayerService();
  io.sockets.on('connection', function(socket) {
    Player.connect(socket, playerService);

    socket.on('disconnect', function() {
      Player.disconnect(socket);
    });
  });



  setInterval(function() {
  }, 2500)
}
