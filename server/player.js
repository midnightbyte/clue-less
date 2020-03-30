class Player {
  constructor(socket, name) {
    this.name = name
    this.socket = socket;
    this.lobby = undefined;
    this.person = undefined;
  }
}
