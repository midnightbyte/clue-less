const Character = require("./character").Character;

module.exports = {
    GameState: function(gameID) {
        this.players = [];
        this.gameID = gameID;
        this.activePlayers = 0;
        this.initialized = false;
        this.solutioncards = {};

        // active character list
        this.characters = [
            new Character("Miss Scarlet"),
            new Character("Colonel Mustard"),
            new Character("Mrs White"),
            new Character("Mr Green"),
            new Character("Mrs Peacock"),
            new Character("Professor Plum")
        ]

        this.createGame = function () {

            // set up first player
            for (let i=0; i<this.players.length; i++) {
                if  (this.players[i].character.name === 'Miss Scarlet') {
                    this.activeplayer = this.players[i];
                } else {
                    this.activeplayer = this.players[0];
                }
            }

            this.activePlayers = this.players.length;

            // deal cards
            this.dealClueCards();
            this.initialized = true;
            console.log('current player ' + this.activeplayer.name);

        },
        this.dealClueCards = function() {

            let wclues = ["candlestick","knife","rope","revolver","pipe","wrench"];
            let sclues = ["Miss Scarlet","Colonel Mustard","Mrs White","Mr Green","Mrs Peacock","Professor Plum"];
            let rclues = ["ballroom","billiardroom","conservatory","diningroom","hall","kitchen","library","lounge","study"];

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
