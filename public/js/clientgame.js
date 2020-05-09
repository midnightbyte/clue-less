
let selectedChar;

$(document).ready(function(){
    let socket = io.connect('http://localhost:1234');
    socket.on('connect', function(data) {
        socket.emit('joined', 'player has joined');
    });

    // handle player join
    socket.on('playerJoined', function(msg){
        displayGameMessage(msg);
    });

    // handle login dialog submit
    $('#playerLogin').submit(function(e){
        e.preventDefault();
        let pname = $('#playername').val();
        let pcharacter = selectedChar;
        let loginInfo = { playername: pname, playercharacter: pcharacter}
        let msg = pname + " has joined as " + pcharacter;
        socket.emit('createGame', pname, pcharacter, msg);
        $('#loginDialog .close').click();
    });

    socket.on('createGameResponse', (msg) => {
        console.log(msg);
        $('#playerslist').append("<p>" + msg + "</p>")
    });

    socket.on('message', function(message) {
        alert('server message: ' + message);
    });
});
