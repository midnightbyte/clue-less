var PlayerService = require('./playerService');

exports = module.exports = function(io){
  playerService = new PlayerService();
  io.sockets.on('connection', function(socket) {
    console.log(socket.id + ': connect');
    socket.emit('message', 'You are connected');
   // playerService.createPlayer(socket);
    socket.on('createLobby', function(data) {
      console.log(socket.id + ': createLobby');
      let lobby = playerService.createLobby();
      playerService.joinLobby(socket, lobby.id)
    });
    socket.on('joinLobby', function(data) {
      console.log(socket.id + ': joinLobby');
      console.log(data.lobbId);
      playerService.joinLobby(socket, data.lobbyId);
    });
    socket.on('login', function(data) {
      console.log('in server' + data.playername + data.playercharacter);
      io.socket.emit('login', { playername: data.playername, playercharacter: data.playercharacter});
      playerService.createPlayer(data.playername, data.playercharacter);
    });
    socket.on('leaveLobby', function(data) {
      console.log(socket.id + ': joinLobby');
      playerService.leaveLobby(socket);
    });
    socket.on('disconnect', function() {
      console.log(socket.id + ': disconnect');
      playerService.destroyPlayer(socket)
    });
  });

  setInterval(function() {
    console.log('\nPlayers:');
    console.log(playerService.emitPlayers());
  }, 2500)
}
