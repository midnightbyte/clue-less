let PlayerService = require('./playerService');
let Player = require('./player');

module.exports = function(io){
  let playerService = new PlayerService();
  io.sockets.on('connection', function(socket) {
    Player.connect(socket, playerService);
    io.emit('playerConnected');

    socket.on('disconnect', function() {
      Player.disconnect(socket, playerService);
      io.emit('playerDisconnected');
    });
  });
}
