
let selectedChar;
let mysocketID;
let gameStarted = false;
let playerData;


$(document).ready(function(){
    let socket = io.connect('http://localhost:1234');

    socket.on('connected', function(data) {
        clearGameMessage();
        displayGameMessage('waiting for players ...')
        mysocketID = data.id;
        socket.emit('initialize');
    });

    // handle player join
    socket.on('playerJoined', function(data){

     //   displayGameMessage(msg);
    });

    socket.on('playerDisconnected', function(data){
      //  $("#messages").load(window.location.href + " #messages" );
        displayGameMessage('player has left');
    });

    socket.on('availableCharacters', function(data) {
        setCharacterList(data.charList);
    });

    socket.on('selectedCharacters', function(data) {
        setCharacterList(data.charList);
        setPlayerList(data.game.players);


        $('#loginbutton').remove();
        if (data.game.players.length >= 3) {
            $('#startbutton').toggle();
        }
    })

    // handle login dialog submit
    $('#playerLogin').submit(function(e){
        e.preventDefault();
        let pname = $('#playername').val();
        let pcharacter = selectedChar;
        let charInfo = { playername: pname, playercharacter: pcharacter};

        socket.emit('selectedCharacter', charInfo);
        $('#loginDialog .close').click();
    });

    // handle start game submit
    $('#startGame').click(function(e){
        e.preventDefault();
        console.log("game started");
        socket.emit('startgame');
    });

    socket.on('showGame', function(data) {
        $('#startbutton').toggle();
        $('#checklist').toggle();
        $("#gameBoardContainer").toggle();
        displayGameMessage(data.msg);
        if (data.game.players.length > 0) {
            for (let i = 0; i < data.game.players.length; i++) {
                setToken(data.game.players[i].character);
                console.log('firstplayer id' + data.firstPlayer);
                console.log('socket id' + mysocketID)
                if (data.firstPlayer === mysocketID) {
                    let thisplayer = data.game.players[i];
                    if (data.game.whosturn.id === thisplayer.id) {
                        displayGameMessage(thisplayer.character + ' - ' + thisplayer.name + ' goes first!');
                        // this is where we tell whos turn it is
                    }
                    let player = data.game.players[i];
                    displayCards(player);
                }
            }
        }
    });


    socket.on('createGameResponse', (msg) => {
        console.log(msg);
        $('#playerslist').append("<p>" + msg + "</p>")
    });

    socket.on('message', function(message) {
        alert('server message: ' + message);
    });
});
