class Clue {
  constructor(id) {
    this.id = id;
  }
}

class Person extends Clue {
  constructor(color, name, location) {
    super(color);
    this.name = name;
    this.location = PERSONS[color]["location"];

    this.clues = [];
    this.checklist = undefined;
  }
}

class Weapon extends Clue {
  constructor(id) {
    super(id);
  }
}

class Room extends Clue {
  constructor(id) {
    super(id);
    this.paths = {...ROOMS, ...HALLWAYS}[id]["paths"];
  }
}

module.exports = Clue;
