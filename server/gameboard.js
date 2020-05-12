let space = require('./space');
let character = require('./character');

module.exports = {
    Gameboard: function() {
        this.characterLocations = {};
        this.gameLocations = {};

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
            let studyToHall = new space.Space("StudytoHall", false, [], "hall-horizontal.jpg");
            let hallToLounge = new space.Space("HalltoLounge", false, [new character.Character("Miss Scarlet")], "hall-horizontal.jpg");
            let libraryToBilliard = new space.Space("LibrarytoBilliardRoom", false, [], "hall-horizontal.jpg");
            let billiardToDining = new space.Space("BilliardRoomtoDiningRoom", false, [], "hall-horizontal.jpg");
            let consToBallroom = new space.Space("ConservatorytoBallroom", false, [new character.Character("Mr Green")], "hall-horizontal.jpg");
            let ballroomToKitchen = new space.Space("BallroomtoKitchen", false, [new character.Character("Mrs White")], "hall-horizontal.jpg");
            let studyToLibrary = new space.Space("StudytoLibrary", false, [new character.Character("Professor Plum")], "hall-vertical.jpg");
            let libraryToCons = new space.Space("LibrarytoConservatory", false, [new character.Character("Mrs Peacock")], "hall-vertical.jpg");
            let hallToBilliard = new space.Space("HalltoBilliardRoom", false, [], "hall-vertical.jpg");
            let billiardToBallroom = new space.Space("BilliardRoomtoBallroom", false, [], "hall-vertical.jpg");
            let loungeToDining = new space.Space("LoungetoDiningRoom", false, [new character.Character("Colonel Mustard")], "hall-vertical.jpg");
            let diningToKitchen = new space.Space("DiningRoomtoKitchen", false, [], "hall-vertical.jpg");
            let consToLounge = new space.Space("ConservatorytoLounge", false, [], "");
            let kitchenToStudy = new space.Space("KitchentoStudy", false, [], "");
            let loungeToCons = new space.Space("LoungetoConservatory", false, [], "");
            let studyToKitchen = new space.Space("StudytoKitchen", false, [], "");




            // // character start point and images
            // let scarlet = new space.Space("Scarlet", false, [new character.Character("Miss Scarlet")], "red-token.png");
            // let mustard = new space.Space("Mustard", false, [new character.Character("Colonel Mustard")], "yellow-token.png");
            // let white = new space.Space("White", false, [new character.Character("Mrs White")], "white-token.png");
            // let green = new space.Space("Green", false, [new character.Character("Mr Green")], "green-token.png");
            // let peacock = new space.Space("Peacock", false, [new character.Character("Mrs Peacock")], "blue-token.png");
            // let plum = new space.Space("Plum", false, [new character.Character("Professor Plum")], "purple-token.png");

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
            let y = charactername;
            return this.characterLocations[y];
        }


    }
};
