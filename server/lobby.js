const { uuid } = require('uuidv4');

class Lobby {
  constructor(playerService) {
    this.playerService = playerService;
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
}

module.exports = Lobby;
