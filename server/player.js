const { uuid } = require('uuidv4');
exports = module.exports = function(io){
  playerService = new PlayerService();
  io.sockets.on('connection', function(socket) {
    console.log(socket.id + ': connect')

    socket.on('createLobby', function(data) {
      console.log(socket.id + ': createLobby');
      playerService.addPlayer(socket, data.name);
      playerService.createLobby(socket);
    });
    socket.on('joinLobby', function(data) {
      console.log(socket.id + ': joinLobby');
      playerService.addPlayer(socket, data.name);
      playerService.joinLobby(socket, data.lobby);
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

  setInterval(function() {
    players = {};
    for (var player in playerService.players) {
      players[playerService.players[player].name] = playerService.players[player].lobby
    }
    console.log(players)
    io.emit('players', {
      players: players
    });
  }, 2500)
}

class Player {
  constructor(socket, name) {
    this.name = name
    this.socket = socket;
    this.lobby = undefined;
    this.person = undefined;
  }
}

class PlayerService {
  constructor() {
    this.players = {};
  }

  addPlayer(socket, name) {
    this.players[socket.id] = new Player(socket, name);
    console.log(this.players[socket.id].name);
  }

  joinLobby(socket, lobby) {
    console.log(socket)
    socket.join(lobby);
    console.log(socket)
    this.players[socket.id].lobby = lobby;
  }

  createLobby(socket) {
    this.joinLobby(socket, uuid());
  }

  removePlayer(socket) {
    delete this.players[socket.id];
  }

  leaveLobby(socket) {
    socket.leave(this.players[socket.id].lobby);
    this.removePlayer(socket);
  }

  addPerson(socket, color) {
    this.players[socket.id].person = new Person(color, this.players[socket.id].name);
  }

  startGame(socket) {
    let lobby = this.players[socket.id].lobby
    let players =
    for (socketId in io.in(lobby).clients) {
      players[socketId] = this.players[socketId]
    }
    new GameService(lobby, players)
  }
}
