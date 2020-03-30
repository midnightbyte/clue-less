class Player {
  constructor(socket) {
    this.id = socket.id;
    this.socket = socket;
    this.lobby = undefined;
    this.person = undefined;
  }
}

module.exports = Player;
