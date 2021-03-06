const Character = require("./character").Character;
const gamelayout = require('./gameboard');
const Space = require('./space');

module.exports = {
    GameState: function(gameID) {
        this.players = [];
        this.gameID = gameID;
        this.activePlayers = 0;
        this.initialized = false;
        this.solutioncards = {};
        this.whosturn = null;
        //this.gameBoard = new gamelayout.Gameboard();

        // active character list
        this.characters = [
            new Character("MissScarlet"),
            new Character("ColonelMustard"),
            new Character("MrsWhite"),
            new Character("MrGreen"),
            new Character("MrsPeacock"),
            new Character("ProfessorPlum")
        ]

        this.createGame = function () {

            // set up first player
            for (let i=0; i<this.players.length; i++) {
                let charname = this.players[i].character;
                if  (charname.localeCompare("MissScarlet")) {
                    this.whosturn = this.players[0];
                } else {
                    this.whosturn = this.players[i];
                }
            }

            this.activePlayers = this.players.length;

            // deal cards
            this.dealClueCards();
            // lay out game board
           // this.gameBoard.boardlayout();

            this.initialized = true;
            console.log('current player ' + this.whosturn.name);
        },

        this.dealClueCards = function() {

            let wclues = ["Candlestick","Knife","Rope","Revolver","Pipe","Wrench"];
            let sclues = ["MissScarlet","ColonelMustard","MrsWhite","MrGreen","MrsPeacock","ProfessorPlum"];
            let rclues = ["Ballroom","BilliardRoom","Conservatory","DiningRoom","Hall","Kitchen","Library","Lounge","Study"];

            let random1 = Math.floor(Math.random()*sclues.length);
            this.solutioncards['suspect'] = sclues[random1];
            sclues.splice(random1, 1);
            console.log('suspect ' + this.solutioncards['suspect']);

            let random2 = Math.floor(Math.random()*wclues.length);
            this.solutioncards['weapon'] = wclues[random2];
            wclues.splice(random2, 1);
            console.log('weapon ' + this.solutioncards['weapon']);

            let random3 = Math.floor(Math.random()*rclues.length);
            this.solutioncards['room'] = rclues[random3];
            rclues.splice(random3, 1);
            console.log('room ' + this.solutioncards['room']);


            let clueList = sclues.concat(wclues).concat(rclues);

            let playerCounter = 0;
            while (clueList.length) {
                playerCounter = playerCounter % this.players.length;
                let clue = Math.floor(Math.random()*clueList.length);
                this.players[playerCounter].cards.push(clueList[clue]);
                clueList.splice(clue, 1);
                playerCounter += 1;
            }
        }

        this.getNextPlayer = function (playerId, forAnsweringSuggestion) {
                var nextPlayer;

                while(!nextPlayer){
                    var potential = players.filter(function(player){
                        return player.id === playerId;
                    });

                    if(potential.length > 0 && (forAnsweringSuggestion || potential[0].currentplayer)){
                        nextPlayer = potential[0];
                    }
                    else if(playerId > 5){
                        playerId = 0;
                    }
                    else{
                        playerId++;
                    }
                }

                return nextPlayer;
            }


            // this.currentPlayerLocation = function(){
        //     return this.gameBoard.getCharacterLocation(this.currentplayer.character.toString());
        // }
        //
        // this.getMoves = function(){
        //     let moves = [];
        //     moves.push("Make Accusation!");
        //
        //     let ch = this.currentplayer.character;
        //     let chLocation = this.gameBoard.getCharacterLocation(this.currentplayer.character);
        //
        //     let nextRooms = chLocation.nextSpaces;
        //
        //     if(!chLocation.isRoom) {
        //         for (var i = 0; i < nextRooms.length; i++) {
        //             moves.push("Move: " + nextRooms[i].name);
        //         }
        //     }
        //     if(ch.active){
        //         moves.push("Make Suggestion");
        //         ch.active = false;
        //     }
        //     //for(var i = 0; i< nextRooms.length; i++){
        //     //if(!this.gameBoard.isOccupiedHallway(nextRooms[i])){
        //         //         moves.push("Move: "+nextRooms[i]);
        //         //     }
        //         // }
        //
        //     //console.log("Options: " + options);
        //     return moves;
        // }
    }
}

// class GameState {
//   constructor(players) {
//     this.players = players;
//     this.personPlayers = {};
//     for (player in players) {
//       this.personPlayers[player.person.name] = player;
//     }
//
//     this.turnList = players
//     shuffle(this.turnList)
//     this.currentPlayer = this.turnList[0]
//
//     this.active = true
//     this.winner = undefined
//     this.turnStatus = MOVE
//
//     this.currentSuggestion = undefined
//     this.currentSuggestionResponse = undefined
//     this.currentSuggestionResponder = undefined
//
//     this.clues = {}
//     this.persons = {}
//     this.weapons = {}
//     this.rooms = {}
//
//     this.spaces = {}
//
//     this.messages = []
//
//     _setupSpaces();
//
//     _setupClues();
//
//     _dealClues();
//   }
//
//   _setupSpaces() {
//     for (var room in ROOMS) {
//       this.spaces[room] = new RoomSpace(room);
//     }
//     for (var hallway in HALLWAYS) {
//       this.spaces[hallway] = new HallwaySpace(hallway);
//     }
//
//     SPACES = {...ROOMS, ...HALLWAYS}
//
//     for (var space in this.spaces) {
//       for (var path in SPACES[space].paths) {
//         this.spaces[space].paths.push(this.spaces[path])
//       }
//     }
//   }
//
//   _setupClues() {
//     for (var person in PERSONS) {
//       let personName = PERSONS[person].name;
//       let personLocation = this.spaces[PERSONS[person].location];
//       this.persons[person] = new Person(person, personName, personLocation);
//       this.clues[person] = this.persons[person];
//     }
//
//     for (player in this.players) {
//       let playerPerson = player.person
//       playerPerson.location = this.spaces[playerPerson.id]
//       this.persons[playerPerson.id] = playerPerson;
//     }
//
//     for (var weapon in WEAPONS) {
//       this.weapons[weapon] = new Weapon(weapon);
//       this.clues[weapon] = this.weapons[weapon];
//     }
//     for (var room in ROOMS) {
//       let roomLocation = this.spaces[room];
//       this.rooms[room] = new Room(room, roomLocation);
//       this.clues[room] = this.rooms[room];
//     }
//   }
//
//
//   nextCurrentPlayer() {
//     this.turnList.push(this.turnList.shift());
//     this.currentPlayer = this.turnList[0];
//   }
// }

//module.exports = GameState;
