MOVE
SUGGEST
SUGGEST_RESPONSE
ACCUSE_END

const CONSTANTS = require('./constants.json')


class GameState {
  constructor(players) {

    this.players = players
    this.turnList = players.slice()
    shuffle(this.turnList)//assigns random turn order

    this.currentPlayer = 0//index into turn list

    this.turnStatus = undefined

    this.currentSuggestion = undefined
    this.currentSuggestionResponse = undefined

    this.active = true
    this.winner = undefined

    this.persons = constants.persons

    this.weapons = constants.weapons
    this.rooms = constants.rooms

    this.player_locations = [] //map from player indeces to position on game board
    for (var i = this.players.length - 1; i >= 0; i--) {
        this.player_locations[i] = this.persons[this.players[i].person].location
    }

    this.messages = []

    var weapons_list = this.weapons.slice()
    var rooms_list = this.rooms.keys().slice()
    var persons_list = this.persons.keys().slice()
    shuffle(weapons_list)
    shuffle(persons_list)
    shuffle(rooms_list)

    this.solution = {//the correct solution to the game
        'person': persons_list.pop()
        'weapon': weapons_list.pop()
        'room': rooms_list.pop()
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
