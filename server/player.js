exports = module.exports = function(io){
  playerService = new PlayerService();
  io.sockets.on('connection', function(socket) {
    console.log(socket.id + ': connect')

    socket.on('createLobby', function(data) {
      playerService.addPlayer(socket, data.name);
      let lobbyId = playerService.createLobby();
      playerService.joinLobby(socket, lobbyId);
      console.log(socket.id + ': createLobby');
    });
    socket.on('joinLobby', function(data) {
      console.log(socket.id + ': joinLobby');
    });

    socket.on('removePlayer', function(data) {
      console.log(socket.id + ': removePlayer');
      playerService.removePlayer(socket);
    });

    socket.on('notifyPlayer', function(data) {
      console.log(socket.id + ': removePlayer');
      playerService.notifyPlayer(socket, message);
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
    console.log(player)
  }
}, 2500)

class Player {
  constructor(name, socket) {
    self.name = name
    self.socket = socket;
    this.lobby = undefined;
  }
}

class PlayerService {
  constructor() {
    this.players = {}
  }

  addPlayer(name, socket) {
    this.players[socket.id] = new Player(name, socket);
  }

  createLobby() {
    let lobbyId = (Math.random()+1).toString(36).slice(2, 4);
    return lobbyId;
  }

  joinLobby(socket, lobbyId) {
    this.player[socket.id].lobby = lobbyId
  }

  removePlayer()
}
