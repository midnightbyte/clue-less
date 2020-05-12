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
            case "Miss Scarlet":  liststring += '<li data-char="Miss Scarlet"><img src="img/scarlet.jpg" width="70"></li>'; break;
            case "Colonel Mustard" :  liststring += '<li data-char="Colonel Mustard"><img src="img/mustard.jpg" width="70"></li>'; break;
            case "Mrs White" :  liststring += '<li data-char="Mrs White"><img src="img/white.jpg" width="70"></li>'; break;
            case "Mr Green" :  liststring += '<li data-char="Mr Green"><img src="img/green.jpg" width="70"></li>'; break;
            case "Mrs Peacock" :  liststring += '<li data-char="Mrs Peacock"><img src="img/peacock.jpg" width="70"></li>'; break;
            case "Professor Plum" :  liststring += '<li data-char="Professor Plum"><img src="img/plum.jpg" width="70"></li>'; break;
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
        case "Miss Scarlet":  token = "<img src=img/red-token.png"; break;
        case "Colonel Mustard" :  token =  "<img src=img/yellow-token.png"; break;
        case "Mrs White" :  token = "<img src=img/white-token.png"; break;
        case "Mr Green" :  token = "<img src=img/green-token.png"; break;
        case "Mrs Peacock" :  token = "<img src=img/blue-token.png"; break;
        case "Professor Plum" :  token = "<img src=img/purple-token.png"; break;
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
    $('div#gameBoardContainer').prepend($('<character id="' + character +'"">'));
}
