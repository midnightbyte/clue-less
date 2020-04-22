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
	_validateTurnStatus(MOVE);
	_validateCurrentPlayer(player);
	_validateSpace(space); 
	_validateSpaceInLoc(space);

    movePerson(player.person, gameState.spaces[space])

    if (player.person.location in gameState.rooms) {
      gameState.turnStatus = SUGGEST;
    } else {
      gameState.turnStatus = ACCUSE_END;
    }
  }

  handleSuggestion(player, person, weapon, room) {
	
	_validateTurnStatus(SUGGEST);
	_validateCurrentPlayer(player);
	_validatePerson(person);
	_validateWeapon(weapon);
	_validateRoom(room);
	_validatePlayerInRoom(room);

		move(gameState.persons[person], gameState.rooms[room])
		suggest(player, gameState.persons[person], gameState.weapons[weapon], gameState.rooms[room]);

    gameState.turnStatus = SUGGEST_RESPONSE;
  }

  handleSuggestionResponse(player, clue) {
	_validateTurnStatus(SUGGEST_RESPONSE);
	_validateCurrentPlayer(player);
	_validateClue(clue);

    player.person.seen.push(clue)
    gameState.turnStatus = ACCUSE_END
  }

  handleAccusation(player, person, weapon, room) {
	_validateTurnStatus(ACCUSE_END);
	_validateCurrentPlayer(player);
	_validatePerson(person);
	_validateWeapon(weapon);
	_validateRoom(room);

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
  
  	_validateTurnStatus(turnStatus){
		if(this.gameState.turnStatus != turnStatus) 
		  throw "invalid turn status";
	 }
  
	_validateCurrentPlayer(player){
		if(this.gameState.currentPlayer != player) 
		  throw "invalid current player";
	 }
	
	_validateSpace(space){
		if (space in this.gameState.spaces != true)
			throw "invalid space"; 
	}
	_validateSpaceInPlayerLoc(space){
	    // TODO: Validate space in player.person.location.paths;
		if (space in this.gameState.player.person.location.paths != true)
			throw "invalid space"; 
	}
	
	_validatePerson(person){
		if (person in this.gameState.persons != true)
			throw "invalid person"; 
	}
	
	_validateWeapon(weapon){
		if (weapon in this.gameState.weapons != true)
			throw "invalid weapon"; 
	}

	_validateRoom(room){
		if (room in this.gameState.rooms != true)
			throw "invalid room"; 
	}

	_validatePlayerInRoom(room){
		if (play.person.location != gameState.rooms[room])
			throw "invalid player location"; 
	}
	
	_validateClue(clue){
		if (clue in this.gameState.cluses != true)
			throw "invalid clue"; 
	}
}

module.exports = GameService;
