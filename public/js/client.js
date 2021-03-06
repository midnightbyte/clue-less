$(document).ready(function(){
    var element = $('meta[name="active-menu"]').attr('content');
    $('#' + element).addClass('active');

    $('ul.char-selection li').click( function(){
        $('.char-selection li').removeClass('selected')
        $(this).addClass('selected');
        selectedChar = $(this).data('char');
    });
});

function setCharacterList(charlist) {

  //  $('#char-selection').html
    let labelstring = '<label for="playercharacter">Select a Character</label>';
    let liststring = ' <ul class="char-selection">';


    for (let i=0; i<charlist.length; i++) {
        let character = charlist[i];
        let n = character.name;

        switch (n) {
            case "MissScarlet":  liststring += '<li data-char="MissScarlet"><img src="img/scarlet.jpg" width="70"></li>'; break;
            case "ColonelMustard" :  liststring += '<li data-char="ColonelMustard"><img src="img/mustard.jpg" width="70"></li>'; break;
            case "MrsWhite" :  liststring += '<li data-char="MrsWhite"><img src="img/white.jpg" width="70"></li>'; break;
            case "MrGreen" :  liststring += '<li data-char="MrGreen"><img src="img/green.jpg" width="70"></li>'; break;
            case "MrsPeacock" :  liststring += '<li data-char="MrsPeacock"><img src="img/peacock.jpg" width="70"></li>'; break;
            case "ProfessorPlum" :  liststring += '<li data-char="ProfessorPlum"><img src="img/plum.jpg" width="70"></li>'; break;
        }
    }
    liststring += '</ul>';

    $('#char-selection').html(labelstring + liststring);
    // This click handler actually does work
    jQuery('ul.char-selection li').unbind('click');
    $('ul.char-selection li').click( function(){
        $('.char-selection li').removeClass('selected')
        $(this).addClass('selected');
        selectedChar = $(this).data('char');
    });
}

function setPlayerList(playerlist) {
    $('#playerslist').empty();
    for (let i=0; i<playerlist.length; i++) {
        let p = playerlist[i];
        let n = p.name;
        let c = p.character;
        displayPlayer(n, c);
     }
}

// handle login dialog open
$('#loginDialog').dialog({
    modal: true,
    overlay: {
        opacity: 0.7,
        background: "black"
    }
});

// handle player listing
function displayPlayer (name, character) {
    let msg = formatPlayerListing(name, character);
    $('#playerslist').append(msg);
}

// format player listing
function formatPlayerListing (name, character) {
    let token;

    switch (character) {
        case "MissScarlet":  token = "<img src=img/red-token.png"; break;
        case "ColonelMustard" :  token =  "<img src=img/yellow-token.png"; break;
        case "MrsWhite" :  token = "<img src=img/white-token.png"; break;
        case "MrGreen" :  token = "<img src=img/green-token.png"; break;
        case "MrsPeacock" :  token = "<img src=img/blue-token.png"; break;
        case "ProfessorPlum" :  token = "<img src=img/purple-token.png"; break;
    }
    msg = token + " width=20>" + name + ' has joined as ' + character + '<br>';
    return msg;
}


// handle game messages
function displayGameMessage (msg) {
    msg = '<li>' + msg + '</li>';
    $('#messages').append(msg);
    //window.scrollTo(0, document.body.scrollHeight);
}

function clearGameMessage() {
    $('#messages').empty();
}

function setToken(character) {
    displayGameMessage(character + ' has been added to the board');
    $('#gameBoardContainer').prepend($('<character id="' + character +'"">'));
}

function validMove(currentLocation, targetLocation){
    var validMoves = {
        Study : ['Study_Hall', 'Study_Library', 'Kitchen'],
        Hall : ['Study_Hall', 'Hall_Lounge', 'Hall_BilliardRoom'],
        Lounge : ['Hall_Lounge', 'Lounge_DiningRoom', 'Conservatory'],
        Library : ['Study_Library', 'Library_BilliardRoom', 'Library_Conservatory'],
        BilliardRoom : ['Library_BilliardRoom', 'Hall_BilliardRoom', 'BilliardRoom_DiningRoom', 'BilliardRoom_Ballroom'],
        DiningRoom : ['Lounge_DiningRoom', 'BilliardRoom_DiningRoom', 'DiningRoom_Kitchen'],
        Conservatory : ['Library_Conservatory', 'Conservatory_Ballroom', 'Lounge'],
        Ballroom : ['Conservatory_Ballroom', 'BilliardRoom_Ballroom', 'Ballroom_Kitchen'],
        Kitchen : ['Ballroom_Kitchen', 'DiningRoom_Kitchen', 'Study'],
        Study_Hall : ['Study', 'Hall'],
        Hall_Lounge : ['Hall', 'Lounge'],
        Study_Library : ['Study', 'Library'],
        Hall_BilliardRoom : ['Hall', 'BilliardRoom'],
        Lounge_DiningRoom : ['Lounge', 'DiningRoom'],
        Library_BilliardRoom : ['Library', 'BilliardRoom'],
        BilliardRoom_DiningRoom : ['BilliardRoom', 'DiningRoom'],
        Library_Conservatory : ['Library', 'Conservatory'],
        BilliardRoom_Ballroom : ['BilliardRoom', 'Ballroom'] ,
        DiningRoom_Kitchen :  ['DiningRoom', 'Kitchen'],
        Conservatory_Ballroom : ['Conservatory', 'Ballroom'],
        Ballroom_Kitchen : ['Ballroom', 'Kitchen']
    }

    return (validMoves[currentLocation] && validMoves[currentLocation].indexOf(targetLocation.id) !== -1);
}

function displayCards (player) {
    $('#cardContainer').empty();
    $.each(player.cards, function(i, card){
        var cardNode = '<card id="' + card + '"></card>';
        if($('card#' + card).length === 0){
            $('#cardContainer').append(cardNode);
            $('card#' + card).css('background',  'url("/img/cards/' + card + '.jpg")');
            $('card#' + card).css('background-size',  '100% 100%');
            $('card#' + card).css('background-repeat',  'no-repeat');
        }
    });
}

function updateGameBoard (data) {
    playerData = data.game.players;

    $.each(playerData, function(i, player){
        if($('character[id="' + player.character+'"]').length === 0){
            setToken(player.character);
        }
        var position = $('#' + player.location).position();
        var roomOccupancy = playerData.filter(function(index) {
            return index.location === player.location;
        });
        position.left = ((roomOccupancy.indexOf(player)%3) * $('character[id="' + player.character+'"]').width()) + position.left ;
        if(roomOccupancy.indexOf(player) > 2){
            position.top = $('character[id="' + player.character+'"]').height()*1.5 + position.top;
        }
        $('character[id="' + player.character +'"]').css({'top': position.top, 'left': position.left});

    });
}
