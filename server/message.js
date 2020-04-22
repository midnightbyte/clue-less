class Message {
  contructor(to=undefined, message) {
    this.to = to;
    this.message = message;
  }
}

class ServerMessage extends Message {
  constructor(to=undefined, message) {
    super(to, message)
  }
}

class PlayerMessage extends Message{
  constructor(from, to=undefined, message) {
    super(to, message)
    this.from = from;
  }
}

module.exports = Message;
