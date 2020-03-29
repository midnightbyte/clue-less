exports = module.exports = function(io){
  playerService = new PlayerService();
  io.sockets.on('connection', function(socket) {
    console.log(socket.id + ': connect')

    socket.on('addPlayer', function(data) {
      console.log(socket.id + ': addPlayer');
      // NOTE: Currently no server side verification if the connection is already a player
      playerService.addPlayer(socket);
    });

    socket.on('removePlayer', function(data) {
      console.log(socket.id + ': removePlayer');
      playerService.removePlayer(socket);
    });

    socket.on('notifyPlayer', function(data) {
      console.log(socket.id + ': removePlayer');
      playerService.notifyPlayer(socket, message);
    });

    socket.on('createLobby', function() {
      console.log(socket.id + ': createLobby');
      // NOTE: Used to create lobby
    });
    socket.on('joinLobby', function() {
      console.log(socket.id + ': joinLobby');
      // NOTE: Used to join lobby, will need server side verification that the lobby exists
    });

    socket.on('disconnect', function() {
      console.log(socket.id + ': disconnect');
      playerService.removePlayer(socket)
    });
  });
}

setInterval(function() {
  console.log('\nConnected players:');
  for (var player in playerService.players) {
    console.log(playerService.players[player].id)
  }
}, 2500)

class PlayerService {
  constructor() {
    // NOTE: This is a dictionary of sockets, it'd be nice if it used the player's name as the key
    this.players = {};
  }

  addPlayer(socket) {
    // NOTE: Again, it'd be nice if it used the player's name as the key
    this.players[socket.id] = socket;
  }

  removePlayer(socket) {
    delete this.players[socket.id];
  }

  notifyPlayer(from, to, message) {
    // NOTE: This needs to be able to send messages
  }
}
