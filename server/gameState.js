const CONSTANTS = require('./constants')


class GameState {
  constructor(players) {
    this.players = players;
    this.personPlayers = {};
    for (player in players) {
      this.personPlayers[player.person.name] = player;
    }

    this.turnList = players
    shuffle(this.turnList)
    this.currentPlayer = this.turnList[0]

    this.active = true
    this.winner = undefined
    this.turnStatus = MOVE

    this.currentSuggestion = undefined
    this.currentSuggestionResponse = undefined
    this.currentSuggestionResponder = undefined

    this.clues = {}
    this.persons = {}
    this.weapons = {}
    this.rooms = {}

    this.spaces = {}

    this.messages = []

    _setupSpaces();

    _setupClues();

    _dealClues();
  }

  _setupSpaces() {
    for (var room in ROOMS) {
      this.spaces[room] = new RoomSpace(room);
    }
    for (var hallway in HALLWAYS) {
      this.spaces[hallway] = new HallwaySpace(hallway);
    }

    SPACES = {...ROOMS, ...HALLWAYS}

    for (var space in this.spaces) {
      for (var path in SPACES[space].paths) {
        this.spaces[space].paths.push(this.spaces[path])
      }
    }
  }

  _setupClues() {
    for (var person in PERSONS) {
      let personName = PERSONS[person].name;
      let personLocation = this.spaces[PERSONS[person].location];
      this.persons[person] = new Person(person, personName, personLocation);
      this.clues[person] = this.persons[person];
    }

    for (player in this.players) {
      let playerPerson = player.person
      playerPerson.location = this.spaces[playerPerson.id]
      this.persons[playerPerson.id] = playerPerson;
    }

    for (var weapon in WEAPONS) {
      this.weapons[weapon] = new Weapon(weapon);
      this.clues[weapon] = this.weapons[weapon];
    }
    for (var room in ROOMS) {
      let roomLocation = this.spaces[room];
      this.rooms[room] = new Room(room, roomLocation);
      this.clues[room] = this.rooms[room];
    }
  }

  _dealClues() {
    let personsList = Object.keys(this.persons)
    let weaponsList = Object.keys(this.weapons)
    let roomsList = Object.keys(this.rooms)
    shuffle(personsList)
    shuffle(weaponsList)
    shuffle(roomsList)

    this.solution = {
        "person": this.clues[personsList.pop()]
        "weapon": this.clues[weaponsList.pop()]
        "room": this.clues[roomsList.pop()]
    }

    let clueList = [];
    clueList.concat(personsList).concat(weaponsList).concat(roomsList)
    shuffle(clueList)

    playerCounter = 0;
    while (clueList.length) {
      let clue = this.clues[clueList.pop()]
      this.players[playerCounter].person.clues.push(clue)
    }
  }
  nextCurrentPlayer() {
    this.turnList.push(this.turnList.shift());
    this.currentPlayer = this.turnList[0];
  }
}

module.exports = GameState;
