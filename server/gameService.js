var GameState = require('./gameState');

class GameService {
  constructor(playerService, io) {
    this.id = //TODO: UUID
    this.players = []
    this.io = io;
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
    let currentPlayer = this.gameState.currentPlayer
    this.io.to(currentPlayer.socket.id).emit(this.gameState.turnStatus);
    // XXX: MESSAGE
  }

  endGame() {
    // XXX: MESSAGE
  }

  handleMovePerson(player, space) {
    // TODO: Validate this.gameState.turnStatus == MOVE;
    // TODO: Validate this.gameState.currentPlayer == player;
    // TODO: Validate space in this.gameState.spaces;
    // TODO: Validate space in player.person.location.paths;

    movePerson(player.person, this.gameState.spaces[space])
  }

  handleSuggestion(player, person, weapon, room) {
    // TODO: Validate this.gameState.turnStatus == SUGGEST;
    // TODO: Validate this.gameState.currentPlayer == player;
    // TODO: Validate person in this.gameState.persons;
    // TODO: Validate weapon in this.gameState.weapons;
    // TODO: Validate room in this.gameState.rooms;
    // TODO: Validate player.person.location in this.gameState.rooms[room]

		move(this.gameState.persons[person], this.gameState.rooms[room])
    move(this.gameState.weapons[weapon], this.gameState.rooms[room])
		suggest(player, this.gameState.persons[person], this.gameState.weapons[weapon], this.gameState.rooms[room]);
  }

  handleSuggestionResponse(player, clue) {
    // TODO: Validate this.gameState.turnStatus == SUGGEST_RESPONSE;
    // TODO: Validate this.gameState.responsePlayer == player;
    // TODO: Validate clue in this.gameState.clues;

    suggestionResponse(player, this.gameState.clues[clue]);
  }

  handleAccusation(player, person, weapon, room) {
    // TODO: Validate this.gameState.turnStatus == ACCUSE_END;
    // TODO: Validate this.gameState.currentPlayer == player;
    // TODO: Validate person in this.gameState.persons;
    // TODO: Validate weapon in this.gameState.weapons;
    // TODO: Validate room in this.gameState.rooms;

  	accuse(player, this.gameState.persons[person], this.gameState.weapons[weapon], this.gameState.rooms[room]);
  }

  handleEndTurn(player) {
    // TODO: Validate this.gameState.turnStatus == ACCUSE_END;
    // TODO: Validate this.gameState.currentPlayer == player;

    endTurn(player);
  }

  moveClue(clue, space) {
	  clue.location = space;
    // XXX: MESSAGE
  }

  movePlayer(player, space) {
	  player.person.location = space;
    if (player.person.location in this.gameState.rooms) {
      this.gameState.turnStatus = SUGGEST;
      this.io.to(player.socket.id).emit(this.gameState.turnStatus);
    } else {
      this.gameState.turnStatus = ACCUSE_OR_END;
      this.io.to(player.socket.id).emit(this.gameState.turnStatus);
    }
    // XXX: MESSAGE
  }

  suggest(player, person, weapon, room) {
    // XXX: MESSAGE
	  this.gameState.currentSuggestion = [person, weapon, room];

    for (otherPlayer in this.gameState.turnList) {
      for (clue in this.gameState.currentSuggestion) {
        if(otherPlayer.person.clues.includes(clue)) {
          this.gameState.currentSuggestionResponder = otherPlayer;
          this.gameState.turnStatus = AWAIT_RESPONSE;
          this.io.to(player.socket.id).emit(this.gameState.turnStatus);
          this.io.to(this.gameState.currentSuggestionResponder.socket.id).emit(RESPOND, this.currentSuggestion);
          // XXX: MESSAGE
          return;
        }
        // XXX: MESSAGE
      }
    }
    this.gameState.turnStatus = ACCUSE_OR_END;
    this.io.to(player.socket.id).emit(this.gameState.turnStatus);
    // XXX: MESSAGE
  }

  suggestionResponse(player, clue) {
    this.gameState.currentSuggestion = undefined;
    this.gameState.currentSuggestionResponse = undefined;
    this.gameState.currentSuggestionResponder = undefined;

    this.gameState.currentPlayer.person.seen.push(clue);
    this.gameState.turnStatus = ACCUSE_OR_END;
    this.io.to(this.gameState.currentPlayer).emit(this.gameState.turnStatus);
    // XXX: MESSAGE
  }

  accuse(player, person, weapon, room) {
    // XXX: MESSAGE

    if (person in this.gameState.solution && weapon in this.gameState.solution && room in this.gameState.solution) {
      // XXX: MESSAGE
    	this.gameState.winner = player;
      endGame();
    }
    else {
      // XXX: MESSAGE
      // TODO: DELETE PLAYER FROM GAME
      endTurn();
    }
  }

  endTurn(player) {
    // XXX: MESSAGE
    this.gameState.nextCurrentPlayer()
    this.gameState.turnStatus = MOVE
    this.io.to(this.gameState.currentPlayer).emit(this.gameState.turnStatus);
  }

  handleSendMessage(player, to, message) {
    // TODO:
  }

  sendMessage(message) {
    // TODO:
  }
}

module.exports = GameService;
