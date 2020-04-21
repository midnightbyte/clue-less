const CONSTANTS = require('./constants.json')
const PERSONS = CONSTANTS["persons"]
const SPACES = {...CONSTANTS["rooms"],...CONSTANTS["hallways"]}

class Clue {
  constructor(id) {
    this.id = id;
  }
}

class Weapon extends Clue {
  constructor(weapon) {
    super(weapon);
  }
}

class Room extends Clue {
  constructor(room, isHallway) {
    super(room);
    this.paths = SPACES[room]["paths"]
  }
}

class Hallway {

}

class Person extends Clue {
  constructor(color, name=undefined) {
    super(color);
    this.color = color
    if (username) {
      this.name = name;
    }
    this.username = PERSONS[color]["name"];
    this.location = PERSONS[color]["location"];
    this.hasLost = false;

    this.clues = [];
    this.seen = [];
    this.checklist = undefined;
  }

  move(space) {
    player.location = SPACES[space]
  }
}

Person.connect(socket)

module.exports = Clue;
