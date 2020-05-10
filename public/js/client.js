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
        console.log(n);
        switch (n) {
            case "Miss Scarlet":  liststring += '<li data-char="Miss Scarlet" class="selected"><img src="img/scarlet.jpg" width="70"></li>'; break;
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
    //      <select id="playercharacter" name="playercharacter" class="form-control">
        //       <option value="MissScarlet">Miss Scarlet</option>-->
        //      <option value="ColonelMustard">Colonel Mustard</option>-->
        //     <option value="MrsWhite">Mrs. White</option>-->
        //            <option value="MrGreen">Mr. Green</option>-->
        //           <option value="MrsPeacock">Mrs. Peacock</option>-->
        //          </select>

}


// handle login dialog open
$('#loginDialog').dialog({
    modal: true,
    overlay: {
        opacity: 0.7,
        background: "black"
    }
});


// handle game messages
function displayGameMessage (msg) {
    msg = '<li>' + msg + '</li>';
    $('#messages').append(msg);
    //window.scrollTo(0, document.body.scrollHeight);
}

function clearGameMessage() {
    $('#messages').empty();
}
