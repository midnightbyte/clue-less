MOVE
SUGGEST
SUGGEST_RESPONSE
ACCUSE_END

const CONSTANTS = require('./constants.json')


class GameState {
  constructor(players) {
    this.players = {}

    this.currentPlayer = undefined

    this.turnList = []
    this.turnStatus = undefined

    this.currentSuggestion = undefined
    this.currentSuggestionResponse = undefined

    this.active = true
    this.winner = undefined

    this.persons = {}
    this.weapons = {}
    this.rooms = {}

    this.clues = {}

    this.spaces

    this.messages = []
  }

  clues() {

  }
}

module.exports = GameState;
