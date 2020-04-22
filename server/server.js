let PlayerService = require('./playerService');
let Player = require('./player');

module.exports = function(io){
  let playerService = new PlayerService();
  io.on('connection', function(socket) {
    socket.on('joined', function(msg) {
      Player.connect(socket, playerService);
      io.emit('playerJoined', msg);
    });


    socket.on('disconnect', function() {
      Player.disconnect(socket, playerService);
      io.emit('playerDisconnected');
    });
  });
}
