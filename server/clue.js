class Clue {
  constructor(id, location) {
    this.id = id;
    location = location;
  }
}

class Weapon extends Clue {
  constructor(weapon, location=undefined) {
    super(weapon);
  }
}

class Room extends Clue {
  constructor(room, location) {
    super(room, location);
  }
}

class Person extends Clue {
  constructor(person, location=undefined, name) {
    super(person, location);
    this.name = name

    this.clues = [];
    this.seen = [];
    this.checklist = undefined;
  }
}

module.exports = Clue;
