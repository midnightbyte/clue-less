class Clue {
  constructor(id, location) {
    this.id = id;
    location = location;
  }
}

class Weapon extends Clue {
  constructor(weapon, location) {
    super(weapon);
  }
}

class Room extends Clue {
  constructor(room, location) {
    super(room, location);
  }
}

class Person extends Clue {
  constructor(color, location, name) {
    super(color, location);
    this.color = color
    this.name = name

    this.clues = [];
    this.seen = [];
    this.checklist = undefined;
  }
}

module.exports = Clue;
