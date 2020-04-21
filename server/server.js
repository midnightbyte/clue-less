var PlayerService = require('./playerService');
let ClientPlayer = require('../client/clientPlayer');


module.exports = function(io){

  playerService = new PlayerService();

  io.on('connection', function(socket) {
    socket.on('joined', function(data) {
      socket.emit('playerJoined', 'a player has joined');
    });
    socket.on('login', function(playername, character) {
      console.log(playername + ' has joined as ' + character);
      socket.clientPlayer = new ClientPlayer(playername, character);
      playerService.players.push(socket.clientPlayer);
      socket.emit('playerLogin', socket.clientPlayer);
    });
  });



  setInterval(function() {
  }, 2500)
}
