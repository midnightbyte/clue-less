let space = require('./space');
let character = require('./character');

module.exports = {
    Gameboard: function() {

        this.boardlayout = function() {
            // define rooms
            let ballroom = new space.Space("Ballroom", true, [], "ballroom-board.jpg");
            let billiardroom = new space.Space("BilliardRoom", true, [], "billiardroom-board.jpg");
            let conservatory = new space.Space("Conservatory", true, [], "conservatory-board.jpg") ;
            let diningroom = new space.Space("DiningRoom", true, [], "diningroom-board.jpg");
            let hall = new space.Space("Hall", true, [], "hall-board.jpg");
            let kitchen = new space.Space("Kitchen", true, [], "kitchen-board.jpg");
            let library = new space.Space("Library", true, [], "library-board.jpg");
            let lounge = new space.Space("Lounge", true, [], "lounge-board.jpg");
            let study = new space.Space("Study", true, [], "study-board.jpg");

            // define hallways between rooms and starting positions of characters
            let studyToHall = new space.Space("Study to Hall", false, [], "hall-horizontal.jpg");
            let hallToLounge = new space.Space("Hall to Lounge", false, [new character.Character("Miss Scarlet")], "hall-horizontal.jpg");
            let libraryToBilliard = new space.Space("Library to Billiard Room", false, [], "hall-horizontal.jpg");
            let billiardToDining = new space.Space("Billiard Room to Dining Room", false, [], "hall-horizontal.jpg");
            let consToBallroom = new space.Space("Conservatory to Ballroom", false, [new character.Character("Mr Green")], "hall-horizontal.jpg");
            let ballroomToKitchen = new space.Space("Ballroom to Kitchen", false, [new character.Character("Mrs White")], "hall-horizontal.jpg");
            let studyToLibrary = new space.Space("Study to Library", false, [new character.Character("Professor Plum")], "hall-vertical.jpg");
            let libraryToCons = new space.Space("Library to Conservatory", false, [new character.Character("Mrs Peacock")], "hall-vertical.jpg");
            let hallToBilliard = new space.Space("Hall to Billiard Room", false, [], "hall-vertical.jpg");
            let billiardToBallroom = new space.Space("Billiard Room to Ballroom", false, [], "hall-vertical.jpg");
            let loungeToDining = new space.Space("Lounge to DiningRoom", false, [new character.Character("Colonel Mustard")], "hall-vertical.jpg");
            let diningToKitchen = new space.Space("Dining Room to Kitchen", false, [], "hall-vertical.jpg");
            let consToLounge = new space.Space("Conservatory to Lounge", false, [], "");
            let kitchenToStudy = new space.Space("Kitchen to Study", false, [], "");
            let loungeToCons = new space.Space("Lounge to Conservatory", false, [], "");
            let studyToKitchen = new space.Space("Study to Kitchen", false, [], "");


            // define next door spaces for rooms
            ballroom.nextSpaces = [consToBallroom, billiardToBallroom, ballroomToKitchen];
            billiardroom.nextSpaces = [libraryToBilliard, billiardToBallroom, billiardToDining, hallToBilliard];
            conservatory.nextSpaces = [consToBallroom, libraryToCons, consToLounge];
            diningroom.nextSpaces = [diningToKitchen, billiardToDining, loungeToDining];
            hall.nextSpaces = [hallToBilliard, hallToLounge, studyToHall];
            kitchen.nextSpaces = [diningToKitchen, ballroomToKitchen, kitchenToStudy];
            library.nextSpaces = [libraryToCons, libraryToBilliard, studyToLibrary];
            lounge.nextSpaces = [hallToLounge, loungeToDining, loungeToCons];
            study.nextSpaces = [studyToLibrary, studyToHall, studyToKitchen];

            // define next door spaces for hallways
            studyToHall.nextSpaces = [study, hall];
            hallToLounge.nextSpaces = [hall, lounge];
            libraryToBilliard.nextSpaces = [library, billiardroom];
            billiardToDining.nextSpaces = [billiardroom, diningroom];
            consToBallroom.nextSpaces = [conservatory, ballroom];
            ballroomToKitchen.nextSpaces = [ballroom, kitchen];
            studyToLibrary.nextSpaces = [study, library];
            libraryToCons.nextSpaces = [library, conservatory];
            hallToBilliard.nextSpaces = [hall, billiardroom];
            billiardToBallroom.nextSpaces = [billiardroom, ballroom];
            loungeToDining.nextSpaces = [lounge, diningroom];
            diningToKitchen.nextSpaces = [diningroom, kitchen];
            consToLounge.nextSpaces = [lounge];
            kitchenToStudy.nextSpaces = [study];
            loungeToCons.nextSpaces = [conservatory];
            studyToKitchen.nextSpaces = [kitchen];

            this.characterLocations = {
                "Miss Scarlet": hallToLounge,
                "Colonel Mustard": loungeToDining,
                "Mrs White": ballroomToKitchen,
                "Mr Green": consToBallroom,
                "Mrs Peacock": libraryToCons,
                "Professor Plum": studyToLibrary
            };
        }

        this.getCharacterLocation = function(character) {
            return this.characterLocations[character.name]
        }


    }
};
