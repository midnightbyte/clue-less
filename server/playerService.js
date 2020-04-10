const Lobby = require('./lobby');
const Player = require('./player');

class PlayerService {
  constructor() {
    this.players = {};
    this.games = {};
  }
}

module.exports = PlayerService;
