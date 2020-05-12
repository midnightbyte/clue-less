let space = require('./space');
let character = require('./character');

module.exports = {
    Gameboard: function() {
        this.characterLocations = {};
        this.gameLocations = {};

        this.boardlayout = function() {

            // define rooms
            var ballroom = new space.Space("Ballroom", true, []);//, "ballroom-board.jpg");
            var billiardroom = new space.Space("BilliardRoom", true, []);//, "billiardroom-board.jpg");
            var conservatory = new space.Space("Conservatory", true, []);//, "conservatory-board.jpg") ;
            var diningroom = new space.Space("DiningRoom", true, []);//, "diningroom-board.jpg");
            var hall = new space.Space("Hall", true, []);//, "hall-board.jpg");
            var kitchen = new space.Space("Kitchen", true, []);//, "kitchen-board.jpg");
            var library = new space.Space("Library", true, []);//, "library-board.jpg");
            var lounge = new space.Space("Lounge", true, []);//, "lounge-board.jpg");
            var study = new space.Space("Study", true, []);//, "study-board.jpg");

            // define hallways between rooms and starting positions of characters
            var studyToHall = new space.Space("StudytoHall", false, []);//, "hall-horizontal.jpg");
            var hallToLounge = new space.Space("HalltoLounge", false, []);//new character.Character("Miss Scarlet")]);//, "hall-horizontal.jpg");
            var libraryToBilliard = new space.Space("LibrarytoBilliardRoom", false, []);//, "hall-horizontal.jpg");
            var billiardToDining = new space.Space("BilliardRoomtoDiningRoom", false, []);//, "hall-horizontal.jpg");
            var consToBallroom = new space.Space("ConservatorytoBallroom", false, []);//new character.Character("Mr Green")]);//, "hall-horizontal.jpg");
            var ballroomToKitchen = new space.Space("BallroomtoKitchen", false, []);//new character.Character("Mrs White")]);//, "hall-horizontal.jpg");
            var studyToLibrary = new space.Space("StudytoLibrary", false, []);//new character.Character("Professor Plum")]);//, "hall-vertical.jpg");
            var libraryToCons = new space.Space("LibrarytoConservatory", false, []);//new character.Character("Mrs Peacock")]);//, "hall-vertical.jpg");
            var hallToBilliard = new space.Space("HalltoBilliardRoom", false, []);//, "hall-vertical.jpg");
            var billiardToBallroom = new space.Space("BilliardRoomtoBallroom", false, []);//, "hall-vertical.jpg");
            var loungeToDining = new space.Space("LoungetoDiningRoom", false, []);//new character.Character("Colonel Mustard")]);//, "hall-vertical.jpg");
            var diningToKitchen = new space.Space("DiningRoomtoKitchen", false, []);//, "hall-vertical.jpg");
            var consToLounge = new space.Space("ConservatorytoLounge", false, []);//, "");
            var kitchenToStudy = new space.Space("KitchentoStudy", false, []);//, "");
            var loungeToCons = new space.Space("LoungetoConservatory", false, []);//, "");
            var studyToKitchen = new space.Space("StudytoKitchen", false, []);//, "");




            // // character start point and images
            // var scarvar = new space.Space("Scarvar", false, [new character.Character("Miss Scarvar")], "red-token.png");
            // var mustard = new space.Space("Mustard", false, [new character.Character("Colonel Mustard")], "yellow-token.png");
            // var white = new space.Space("White", false, [new character.Character("Mrs White")], "white-token.png");
            // var green = new space.Space("Green", false, [new character.Character("Mr Green")], "green-token.png");
            // var peacock = new space.Space("Peacock", false, [new character.Character("Mrs Peacock")], "blue-token.png");
            // var plum = new space.Space("Plum", false, [new character.Character("Professor Plum")], "purple-token.png");

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
            //
            // scarlet.nextSpaces = [hall, lounge];
            // mustard.nextSpaces = [lounge, diningroom];
            // white.nextSpaces = [ballroom, kitchen];
            // green.nextSpaces = [conservatory, ballroom];
            // peacock.nextSpaces = [library, conservatory];
            // plum.nextSpaces = [study, library];

            this.characterLocations = {
                "Miss Scarlet": hallToLounge,
                "Colonel Mustard": loungeToDining,
                "Mrs White": ballroomToKitchen,
                "Mr Green": consToBallroom,
                "Mrs Peacock": libraryToCons,
                "Professor Plum": studyToLibrary
            };

            this.gameLocations = {
                "Ballroom": ballroom,
                "BilliardRoom": billiardroom,
                "Conservatory": conservatory,
                "DiningRoom": diningroom,
                "Hall": hall,
                "Kitchen": kitchen,
                "Library": library,
                "Lounge": lounge,
                "Study": study,
                "StudytoHall": studyToHall,
                "HalltoLounge": hallToLounge,
                "LibrarytoBilliardRoom": libraryToBilliard,
                "BilliardRoomtoDiningRoom": billiardToDining,
                "ConservatorytoBallroom": consToBallroom,
                "BallroomtoKitchen": ballroomToKitchen,
                "StudytoLibrary": studyToLibrary,
                "LibrarytoConservatory": libraryToCons,
                "HalltoBilliardRoom": hallToBilliard,
                "BilliardRoomtoBallroom": billiardToBallroom,
                "LoungetoDiningRoom": loungeToDining,
                "DiningRoomtoKitcken": diningToKitchen,
                "ConservatorytoLounge": consToLounge,
                "KitchentoStudy": kitchenToStudy,
                "LoungetoConservatory": loungeToCons,
                "StudytoKitchen": studyToKitchen
            };



        },

        this.getCharacterLocation = function(charactername) {
            var y = charactername;
            return this.characterLocations[y];
        }


    }
};
