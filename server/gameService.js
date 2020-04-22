var GameState = require('./gameState');

class GameService {
  constructor(playerService) {
<<<<<<< HEAD
    this.id = //TODO: SOMETHING
    this.players = []
=======
    this.id = uuidv4();
    this.players = [];
    this.personPlayers = {};
    for (player in players) {
      this.personPlayers[player.person.name] = player;
    }
    this.io = io;
>>>>>>> b208572efbda884cb267026311fd5a79f61e4aff
  }

  addPlayer(player) {
    socket.join(this.id);
    this.players.push(player);
  }

  removePlayer(player) {
    socket.leave(this.id);
    this.players.splice(this.players.indexOf(player), 1);
  }

<<<<<<< HEAD
  startGame() {
    this.gameState = new GameState(this.players);
=======
  handleStartGame() {
    // TODO: Validate all players have a person
    // TODO: Validate this.players > 1;

    this.gameState = new GameState(this.players);
    let currentPlayer = this.gameState.currentPlayer
    this.io.to(currentPlayer.socket.id).emit(this.gameState.turnStatus);
    this.io.to(this.id).emit(GAME_STATE, this.gameState);

    // XXX: MESSAGE
    let startGameMessage=ServerMessage("The game has started.");
    sendMessage(startGameMessage);
>>>>>>> b208572efbda884cb267026311fd5a79f61e4aff
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

<<<<<<< HEAD
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
=======
  moveClue(clue, space) {
	  clue.location = space;

	// XXX: MESSAGE
	 let clueMoveMessage = ServerMessage(clue + " has moved to the " + space + ".");
	 sendMessage(clueMoveMessage);
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
    this.io.to(this.id).emit(GAME_STATE, this.gameState);

    // XXX: MESSAGE
	let playerMoveMessage = ServerMessage(player + "(" + player.person.name + ") has moved to the " + space + ".");
	sendMessage(playerMoveMessage);
  }

  suggest(player, person, weapon, room) {
	// XXX: MESSAGE
	let suggestMessage = ServerMessage(player + "(" + player.person.name + ") has suggested " + person + " in the " + room + "with the " + weapon + ".");
	sendMessage(suggestMessage);

	this.gameState.currentSuggestion = [person, weapon, room];

    for (otherPlayer in this.gameState.turnList) {
      for (clue in this.gameState.currentSuggestion) {
        if(otherPlayer.person.clues.includes(clue)) {
          this.gameState.currentSuggestionResponder = otherPlayer;
          this.gameState.turnStatus = AWAIT_RESPONSE;
          this.io.to(player.socket.id).emit(this.gameState.turnStatus);
          this.io.to(this.gameState.currentSuggestionResponder.socket.id).emit(RESPOND, this.currentSuggestion);
          this.io.to(this.id).emit(GAME_STATE, this.gameState);

          // XXX: MESSAGE
          let revealMessage = ServerMessage(otherPlayer + "("  + otherPlayer.person.name + ") revealed a clue to " + this.gameState.currentPlayer + ".");
          sendMessage(revealMessage);

          return;
        }

        let noMatchMessage = ServerMessage(otherPlayer + "("  + otherPlayer.person.name + ") did not reveal a clue.");
        sendMessage(noMatchMessage);
      }
    }
    this.gameState.turnStatus = ACCUSE_OR_END;
    this.io.to(player.socket.id).emit(this.gameState.turnStatus);
    this.io.to(this.id).emit(GAME_STATE, this.gameState);

    // XXX: MESSAGE
    let endSuggestionMessage = ServerMessage(player + "'s (" + player.person.name + ") suggestion has ended.");
    sendMessage(endSuggestionMessage);
  }

  suggestionResponse(player, clue) {
    this.gameState.currentSuggestion = undefined;
    this.gameState.currentSuggestionResponse = undefined;
    this.gameState.currentSuggestionResponder = undefined;

    this.gameState.currentPlayer.person.seen.push(clue);
    this.gameState.turnStatus = ACCUSE_OR_END;
    this.io.to(this.gameState.currentPlayer.socket.id).emit(this.gameState.turnStatus);
    this.io.to(this.id).emit(GAME_STATE, this.gameState);

    // XXX: MESSAGE
    let revealMessage = ServerMessage(this.gameState.currentPlayer, player + "(" + player.person.name + ") revealed their " + clue + " clue.");
    sendMessage(revealMessage);
  }

  accuse(player, person, weapon, room) {
	// XXX: MESSAGE
    let accuseMessage = ServerMessage(player + "(" + player.person.name + ") has accused " + person + " in the " + room + "with the " + weapon + ".");
    sendMessage(accuseMessage);

    if (person in this.gameState.solution && weapon in this.gameState.solution && room in this.gameState.solution) {
    	// XXX: MESSAGE
      let winnerMessage = ServerMessage(player + "(" + player.person.name + ") has won!");
      sendMessage(winnerMessage);

      this.gameState.winner = player;
      this.io.to(this.id).emit(GAME_STATE, this.gameState);
      endGame();
    }
    else {
      // XXX: MESSAGE
      let loserMessage = ServerMessage(player + "(" + player.person.name + ") has lost.");
      sendMessage(loserMessage);

      // TODO: DELETE PLAYER FROM GAME

      endTurn();
    }
  }

  endTurn(player) {
	// XXX: MESSAGE
    let endTurnMessage = ServerMessage(player + "(" + player.person.name + ") has ended their turn.");
    sendMessage(endTurnMessage);

    this.gameState.nextCurrentPlayer()
    this.gameState.turnStatus = MOVE
    this.io.to(this.gameState.currentPlayer.socket.id).emit(this.gameState.turnStatus);
    this.io.to(this.id).emit(GAME_STATE, this.gameState);
  }

  handleSendMessage(player, to, message) {
    // TODO: Validate to in this.personPlayers;

    let message = PlayerMessage(player, this.personPlayers[to], message);
    sendMessage(message);
  }

  sendMessage(message) {
    if(message.to) {
      this.io.to(message.to.socket.id).emit(MESSAGE, message);
    } else {
      this.io.to(this.id).emit(MESSAGE, message);
>>>>>>> b208572efbda884cb267026311fd5a79f61e4aff
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
