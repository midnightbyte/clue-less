var GameState = require('./gameState');

class GameService {
  constructor(playerService) {
    this.id = //TODO: SOMETHING
    this.players = []

  }

  addPlayer(player) {
    socket.join(this.id);
    this.players.push(player);
  }

  removePlayer(player) {
    socket.leave(this.id);
    this.players.splice(this.players.indexOf(player), 1);
  }

  startGame() {
    this.gameState = new GameState(this.players);
  }

  //

  handleMove(player, space) {
    gameState.turnState == MOVE
    gameState.currentPlayer == player
    space in gameState.spaces
    !(space in gameState.persons.map(function(person) {
      return person.location
    }))

    if (player.person.location in gameState.rooms) {
      gameState.turnState = SUGGEST
    } else {
      gameState.turnState = ACCUSE_END
    }

    player.person.move(space)
  }

  handleSuggestion(player, person, weapon, room) {
    if person in gameState.persons
    if player.person.location == room


    gameState.clues[person] = room
    gameState.turnState = SUGGEST_RESPONSE
  }

  handleSuggestionResponse(player, clue) {

    player.person.seen.push(clue)
    gameState.turnState = ACCUSE_END
  }

  handleAccusation(player, person, weapon, room) {
    gameState.turnState = ACCUSE
  }

  handleEndTurn(player) {
    gameState.turnState = MOVE
  }

  //

  movePerson() {

  }

  suggest() {

  }

  suggestionResponse() {

  }

  accuse() {
    
  }


}

module.exports = GameService;
