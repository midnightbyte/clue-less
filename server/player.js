exports = module.exports = function(io){
  playerService = new PlayerService();
  io.sockets.on('connection', function(socket) {
    console.log(socket.id + ': connect')

    socket.on('addPlayer', function(data) {
      console.log(socket.id + ': addPlayer');
      playerService.addPlayer(socket.id);
    });

    socket.on('createLobby', function() {
      console.log(socket.id + ': createLobby');
      // NOTE: Used to create lobby
    });
    socket.on('joinLobby', function() {
      console.log(socket.id + ': joinLobby');
      // NOTE: Used to join lobby, will need server side verification that the lobby exists
    });

    socket.on('removePlayer', function(data) {
      console.log(socket.id + ': removePlayer');
      playerService.removePlayer(socket.id)
    });

    socket.on('disconnect', function() {
      console.log(socket.id + ': disconnect');
      playerService.removePlayer(socket.id)
    });
  });
}

setInterval(function() {
  console.log('\nCurrently connected:');
  console.log(playerService.players)
}, 2500)

class PlayerService {
  constructor() {
    this.players = {};
  }

  addPlayer(id) {
    this.players[id] = id;
  }

  removePlayer(id) {
    delete this.players[id];
  }

  alertPlayer(id) {
    
  }
}
