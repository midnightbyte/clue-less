const CONSTANTS = require('./constants');

class Player {
  constructor(socket, playerService) {
    this.socket = socket;
    this.playerService = playerService;
    this.gameService = undefined;
    this.person = undefined;
  }

  handleCreateGame() {
    this.playerService.games[gameService.id] = gameService;

  }

  handleJoinGame(gameId) {
    // TODO: Validate gameId in playerService.games
    // TODO: Validate game is not full

    let gameService = playerService.games[gameId];
    joinGame(gameService);
    return true;
  }

  handleCreatePerson(color, name) {
    // TODO: Validate color in PERSONS
    // TODO: Validate name not already taken

    createPerson(color, name);
  }

  createGame() {
    let gameService = new GameService(this.playerService);
    player.joinGame(gameService);
    return true;
  }

  joinGame(gameService) {
    gameService.addPlayer(this);
    this.gameService = gameService;
    return true;
  }

  leaveGame() {
    gameService.removePlayer(this);
  }

  createPerson(color, name) {
    let person = new Person(color, name);
    this.person = person;
  }
}

Player.connect = function(socket, playerService) {
  let player = new Player(socket, playerService)
  playerService.players[socket.id] = player

  socket.on('createGame', function() {
    player.createLobby()
  })
  socket.on('joinGame', function(data) {
    player.handleJoinGame(data.gameId)
  })
  socket.on('createPerson', function(data) {
    player.handleCreatePerson(data.name, data.color)
  })


  socket.on('move', function(data) {
    gameService.handleMovePerson(player, data.space);
  })
  socket.on('suggest', function(data) {
    gameService.handleSuggestion(player, data.person, data.weapon, data.room);
  })
  socket.on('accuse', function(data) {
    gameService.handleAccusation(player, data.person, data.weapon, data.room);
  })
  socket.on('endTurn', function() {
    gameService.handleEndTurn();
  })

  socket.on('respond', function(data) {
    gameService.handleCreatePerson(player, data.clue)
  })

  socket.on('sendMessage', function(data) {
    gameService.handleCreatePerson(player, data.to, data.message)
  })

  // FIXME:
  socket.on('gameState', function(response) {
    ack(player.gameService.gameState);
  })
}

Player.disconnect = function(socket) {
  let player = playerService.players[socket.id]
  if (player.game != undefined) {
    this.leaveGame(socket);
  }
  delete player;
}
