$(document).ready(function(){
    var element = $('meta[name="active-menu"]').attr('content');
    $('#' + element).addClass('active');

    $('ul.char-selection li').click( function(){
        $('.char-selection li').removeClass('selected')
        $(this).addClass('selected');
        selectedChar = $(this).data('char');
    });
});


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
