exports = module.exports = function(io){
  playerService = new PlayerService();
  io.sockets.on('connection', function(socket) {
    console.log(socket.id + ': connect')

    socket.on('createLobby', function(data) {
      console.log(socket.id + ': createLobby');
      playerService.addPlayer(socket, data.name);
      let lobby = playerService.createLobby();
      playerService.joinLobby(socket, lobby);
    });
    socket.on('joinLobby', function(data) {
      console.log(socket.id + ': joinLobby');
      playerService.addPlayer(socket, data.name);
      let lobby = data.lobby;
      playerService.joinLobby(socket, lobby);
    });

    socket.on('leaveLobby', function(data) {
      console.log(socket.id + ': joinLobby');
      playerService.leaveLobby(socket);
      playerService.removePlayer(socket);
    })

    socket.on('removePlayer', function() {
      console.log(socket.id + ': removePlayer');
      playerService.removePlayer(socket);
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
    console.log(playerService.players[player].name + ' - ' + playerService.players[player].lobby)
  }
}, 2500)

class Player {
  constructor(socket, name) {
    this.name = name
    this.socket = socket;
    this.lobby = undefined;
  }
}

class PlayerService {
  constructor() {
    this.players = {}
  }

  addPlayer(socket, name) {
    console.log('add player')
    this.players[socket.id] = new Player(socket, name);
    console.log(this.players[socket.id].name);
  }

  createLobby() {
    let lobby = (Math.random()+1).toString(36).slice(2, 6);
    return lobby;
  }

  joinLobby(socket, lobby) {
    socket.join('lobby');
    this.players[socket.id].lobby = lobby;
  }

  leaveLobby(socket) {
    socket.leave(this.players[socket.id].lobby);
    removePlayer(socket)
  }

  removePlayer(socket) {
    delete this.players[socket.id];
  }
}
