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

  handleMove(player, space) {
    // TODO: Validate gameState.turnStatus == MOVE;
    // TODO: Validate gameState.currentPlayer == player;
    // TODO: Validate space in gameState.spaces;
    // TODO: Validate space in player.person.location.paths;

    movePerson(player.person, gameState.spaces[space])

    if (player.person.location in gameState.rooms) {
      gameState.turnStatus = SUGGEST;
    } else {
      gameState.turnStatus = ACCUSE_END;
    }
  }

  handleSuggestion(player, person, weapon, room) {
    // TODO: Validate gameState.turnStatus == SUGGEST;
    // TODO: Validate gameState.currentPlayer == player;
    // TODO: Validate person in gameState.persons;
    // TODO: Validate weapon in gameState.weapons;
    // TODO: Validate room in gameState.rooms;
    // TODO: Validate player.person.location in gameState.rooms[room]

		move(gameState.persons[person], gameState.rooms[room])
		suggest(player, gameState.persons[person], gameState.weapons[weapon], gameState.rooms[room]);

    gameState.turnStatus = SUGGEST_RESPONSE;
  }

  handleSuggestionResponse(player, clue) {
    // TODO: Validate gameState.turnStatus == SUGGEST_RESPONSE;
    // TODO: Validate gameState.currentPlayer == player;
    // TODO: Validate clue in gameState.clues;

    player.person.seen.push(clue)
    gameState.turnStatus = ACCUSE_END
  }

  handleAccusation(player, person, weapon, room) {
    // TODO: Validate gameState.turnStatus == ACCUSE_END;
    // TODO: Validate gameState.currentPlayer == player;
    // TODO: Validate person in gameState.persons;
    // TODO: Validate weapon in gameState.weapons;
    // TODO: Validate room in gameState.rooms;

  	accuse(player, gameState.persons[person], gameState.weapons[weapon], gameState.rooms[room]);
    handleEndTurn(player)
  }

  handleEndTurn(player) {
    gameState.turnList.push(gameState.turnList.shift())
    gameState.turnStatus = MOVE
  }

  movePerson(person, space) {
	  person.location=space
  }

  suggest(Player, person, weapon, room) {
	  gameState.currentSuggestion = [person, weapon, room];

    for (player in gameState.turnList) {
      for (clue in gameState.currentSuggestion) {
        if(player.person.clues.includes(clue)) {
          // TODO: SOCKET SUGGEST
        }
      }
    }
  }

  suggestionResponse(player, clue) {
    // TODO:
  }

  accuse(player, person, weapon, room) {
    if (person in gameState.solution && weapon in gameState.solution && room in gameState.solution) {
    	gameState.winner = player;
    }
    else {
    	player.person.hasLost = true;
    	if(!(player.person.location in gameState.rooms)){
    		// TODO: SOCKET ACCUSE
    	}
    }
  }
}

module.exports = GameService;
