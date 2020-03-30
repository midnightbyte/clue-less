const { uuid } = require('uuidv4');
var GameService = require('./gameService');

class Lobby {
  constructor(playerService) {
    this.playerService = playerService;
    this.gameService = undefined;
    this.id = uuid();
    this.players = [];
    return this.id;
  }

  addPlayer(socket, player) {
    socket.join(this.id);
    player.lobby = this.id;
    this.players.push(player);
  }

  removePlayer(socket) {
    socket.leave(this.id);
    this.players.splice(this.players.indexOf(socket), 1);
  }

  startGame(socket) {
    for (player in this.players) {
      if (player.person != undefined) {
        return false;
      }
    }
    this.gameService = new GameService(this);
  }
}

module.exports = Lobby;
