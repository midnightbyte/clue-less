class Space {
  constructor(id) {
    this.id = id;
    this.paths = undefined;
  }
}

class RoomSpace extends Space {
  constructor(id) {
    super(id);
  }
}

class HallwaySpace extends Space {
  constructor(id) {
    super(id);
  }
}

module.exports = Space;
