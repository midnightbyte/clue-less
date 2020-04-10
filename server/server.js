var PlayerService = require('./playerService');

exports = module.exports = function(io){
  playerService = new PlayerService();
  io.sockets.on('connection', function(socket) {
    Player.connect(socket, playerService);

    socket.on('disconnect', function() {
      Player.disconnect(socket);
    });
  });

  setInterval(function() {
  }, 2500)
}
