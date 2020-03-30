var GameState = require('./gameState');

class GameService {
  constructor(lobby) {
    this.lobby = lobby;
    this.gameState = new GameState(this.players)
  }
}

module.exports = GameService;
