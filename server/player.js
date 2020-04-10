class Player {
  constructor(socket) {
    this.socket = socket;
    this.gameService = undefined;
    this.person = undefined;
  }

  createGame() {
    let gameService = new GameService();
    player.joinGame(game)
    return true
  }

  joinGame(game) {
    gameService.addPlayer(this)
    this.lobby = game
    return true
  }

  leaveGame() {
    gameService.removePlayer(this)
  }

  createPerson() {
    let person = new Person(color, username)
    this.person = person
  }
}

Player.connect = function(socket, playerService) {
  let player = new Player(socket)
  playerService.players[socket.id] = player

  socket.on('createGame', function() {
    player.createLobby()
    playerService.games[player.game.id] = player.game
  })
  socket.on('joinGame', function(data) {
    let game = playerService.games[data.gameId]
    player.joinLobby(game)
  })
  socket.on('createPerson', function(data) {
    player.createPerson(data.username, data.color)
  })
  socket.on('move', function(data) {
    player.move(room)
    player.createPerson(data.username, data.color)
  })
}

Player.disconnect = function(socket) {
  let player = playerService.players[socket.id]
  if (player.game != undefined) {
    this.leaveGame(socket);
  }
  delete player;
}

module.exports = Player;
