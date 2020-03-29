exports = module.exports = function(io){
  playerService = new PlayerService();
  io.sockets.on('connection', function(socket) {
    console.log(socket.id + ': connect')

    socket.on('createLobby', function() {
      console.log(socket.id + ': createLobby');
      gameService = new GameService();
      console.log(gameService.gameId)
    });
    socket.on('joinLobby', function(data) {
      console.log(socket.id + ': joinLobby');
    });

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
  constructor() {
    self.socket = undefined;
    this.person = undefined;
  }
}
class PlayerService {
  constructor() {
    // NOTE: This is a dictionary of sockets, it'd be nice if it used the player's name as the key
    this.players = {};
  }

  createPlayer(socket) {
    // NOTE: Again, it'd be nice if it used the player's name as the key
    this.players[socket.id] = socket;
  }

  addPlayerToLobby() {

  }

  removePlayerFromLobby() {

  }

  createPerson(socket) {

  }

  removePlayer(socket) {
    delete this.players[socket.id];
  }

  notifyPlayer(from, to, message) {
    // NOTE: This needs to be able to send messages
  }
}

class GameService {
  constructor(gameId) {
    this.gameId = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').sort(() => Math.random() - 0.5).splice(0,4).join('');
  }
}
