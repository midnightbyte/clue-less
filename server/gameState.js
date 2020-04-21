const CONSTANTS = require('./constants')


class GameState {
  constructor(players) {
    this.players = players

    // Establish turn list and randomize order
    this.turnList = players
    shuffle(this.turnList)
    this.currentPlayer = this.turnList[0]

    this.active = true
    this.winner = undefined
    this.turnStatus = MOVE
    this.currentSuggestion = undefined
    this.currentSuggestionResponse = undefined

    this.persons = {}
    this.weapons = {}
    this.rooms = {}

    for (var person in PERSONS) {
      this.persons.push(new Person(person));
    }
    for (var [id, player] of Object.entries(this.players)) {
      this.persons[player.person.id] = player.person;
    }
    for (var weapon in WEAPONS) {
      this.weapons.push(new Weapon(weapon));
    }
    for (var room in ROOMS) {
      this.rooms.push(new Room(room));
    }

    for (player in this.players) {
      this.player
    }
    this.playerLocations = [] //map from player indeces to position on game board
    for (var i = this.players.length - 1; i >= 0; i--) {
        this.playerLocations[i] = this.persons[this.players[i].person].location
    }

    this.messages = []

    var personsList = this.persons.keys()
    var weaponsList = this.weapons.keys()
    var roomsList = this.rooms.keys()
    shuffle(weapons_list)
    shuffle(persons_list)
    shuffle(rooms_list)

    this.solution = {//the correct solution to the game
        'person': personsList.pop()
        'weapon': weaponsList.pop()
        'room': roomsList.pop()
    }

    var clue_list = [].concat(weapons_list).concat(persons_list).concat(rooms_list)



    this.clues = [] //list of lists; clues[i] is the list of clues dealt to player i
    for (var i = this.players.length - 1; i >= 0; i--) {
        clues.push([])
    }
    var counter = 0
    for (var i = clue_list.length - 1; i >= 0; i--) {//deal out all the remaining clue cards
        clues[counter].push(clue_list[i])
        counter = counter + 1
        if (counter >= this.players.length) {counter = 0}
    }
  }
}

module.exports = GameState;
