
var game = [];
game.points = 0;
game.winningPoints = 50;
game.paused = false;
game.forcePaused = false;
game.difficulty = 1;
game.noSleep = new NoSleep();

game.tryStart = function() {
    if (/Mobi|Android/i.test(navigator.userAgent)) {
        document.addEventListener('click', function enableNoSleep() {
            document.removeEventListener('click', enableNoSleep, false);
            game.noSleep.enable();
        }, false);
        game.start();
        game.difficulty = 1;
        game.winningPoints = 50;
        game.paused = true;
        game.chooseDifficulty();
    } else {
        alert('Es wird ein mobiles Gerät benötigt, um das Spiel zu starten!\nYou need a mobile device to play the game!');
    }
};

game.start = function() {
    $('header').hide();
    $('main').hide();
    $('footer').hide();
    game.points = 0;
    game.paused = false;
    game.forcePaused = false;
    tic.init(40);
    field.create();
    player.create();
    field.createGameObjects();
    field.update(0, 0);
    tic.add('playerUpdate', player.update);
    tic.add('gameUpdate', game.update);
    tic.add('correctWindowPosition', game.correctWindowPosition);
    sensor.registerSensorListeners();
};

game.update = function() {
    if (!game.forcePaused && !game.paused) {
        if (game.points >= game.winningPoints) {
            if (game.difficulty == 3 && game.points > game.winningPoints) {
                game.lost();
            } else {
                game.won();
            }
        }
        field.update(-player.speed * Math.sin(rad(sensor.compass)), -player.speed * Math.cos(rad(sensor.compass)));
    }
};

game.correctWindowPosition = function() {
    window.scrollTo(0, 0);
};

game.lost = function() {
    game.paused = true;
    game.displayInfo('Game Over', false);
    game.displayRetryAndBack();
};

game.won = function() {
    game.paused = true;
    game.displayInfo('Game Won', false);
    game.displayRetryAndBack();
};

game.pause = function() {
    game.paused = true;
    game.displayInfo('Game Paused', false);
    game.displayResume();
};

game.chooseDifficulty = function() {
    $('header').hide();
    $('main').hide();
    $('footer').hide();
    game.displayInfo('Difficulty', true);
    game.displayDifficultyChoice();
    game.displayStart();
};

game.displayInfo = function(title, big) {
    var modH = 0;
    var modT = 0;
    if (big) {
        modH = 0.2;
        modT = 0.1;
    }
    $('<div id="info" class="gameObject"></div>').appendTo('body');
    $('<div id="infotext" class="gameObject"></div>').appendTo('body');
    var w = field.w * 0.8;
    var h = field.h * (0.4 + modH);
    var t = field.h * (0.3 - modT);
    var l = field.w * 0.1;
    $('#info').css({
        'width': '' + w + 'px',
        'height': '' + h + 'px',
        'top': '' + t + 'px',
        'left': '' + l + 'px',
    });
    w = field.w * 0.8;
    h = field.h * 0.2;
    t = field.h * (0.35 - modT);
    l = field.w * 0.1;
    $('#infotext').css({
        'width': '' + w + 'px',
        'height': '' + h + 'px',
        'top': '' + t + 'px',
        'left': '' + l + 'px',
    });
    $('#infotext').text(title);
};

game.displayRetryAndBack = function() {
    $('<a id="retry" class="gameObject infoButton" onclick="game.restart()">Retry</a>').appendTo('body');
    $('<a id="back" class="gameObject infoButton" onclick="game.back()">Back</a>').appendTo('body');
    var w = field.w * 0.25;
    var h = field.h * 0.1;
    var t = field.h * 0.55;
    var l = field.w * 0.2;
    $('#retry').css({
        'width': '' + w + 'px',
        'height': '' + h + 'px',
        'line-height': '' + h + 'px',
        'top': '' + t + 'px',
        'left': '' + l + 'px',
    });
    l = field.w * 0.55;
    $('#back').css({
        'width': '' + w + 'px',
        'height': '' + h + 'px',
        'line-height': '' + h + 'px',
        'top': '' + t + 'px',
        'left': '' + l + 'px',
    });
};

game.back = function() {
    $('#info').remove();
    $('#infotext').remove();
    $('#retry').remove();
    $('#back').remove();
    game.clear();
    $('header').show();
    $('main').show();
    $('footer').show();
    game.noSleep.disable();
};

game.restart = function() {
    $('#info').remove();
    $('#infotext').remove();
    $('#retry').remove();
    $('#back').remove();
    game.clear();
    game.start();
};

game.clear = function() {
    tic.remove('playerUpdate');
    tic.remove('gameUpdate');
    tic.remove('correctWindowPosition');
    sensor.removeSensorListeners();
    player.clear();
    field.clear();
    tic.deinit();
};

game.displayResume = function() {
    $('<a id="resume" class="gameObject infoButton" onclick="game.resume()">Resume</a>').appendTo('body');
    var w = field.w * 0.4;
    var h = field.h * 0.1;
    var t = field.h * 0.55;
    var l = field.w * 0.3;
    $('#resume').css({
        'width': '' + w + 'px',
        'height': '' + h + 'px',
        'line-height': '' + h + 'px',
        'top': '' + t + 'px',
        'left': '' + l + 'px',
    });
};

game.resume = function() {
    $('#info').remove();
    $('#infotext').remove();
    $('#resume').remove();
    game.paused = false;
};

game.displayDifficultyChoice = function() {
    $('<a id="diffEasy" class="gameObject infoButton" onclick="game.setDifficulty(1)">Easy</a>').appendTo('body');
    $('<a id="diffNormal" class="gameObject infoButton" onclick="game.setDifficulty(2)">Normal</a>').appendTo('body');
    $('<a id="diffHard" class="gameObject infoButton" onclick="game.setDifficulty(3)">Hard</a>').appendTo('body');
    var w = field.w * 0.2;
    var h = field.h * 0.1;
    var t = field.h * 0.45;
    var l = field.w * 0.15;
    $('#diffEasy').css({
        'width': '' + w + 'px',
        'height': '' + h + 'px',
        'line-height': '' + h + 'px',
        'top': '' + t + 'px',
        'left': '' + l + 'px',
        'font-size': '150%',
        'background-color': 'SlateGrey',
    });
    w = field.w * 0.26;
    l = field.w * 0.37;
    $('#diffNormal').css({
        'width': '' + w + 'px',
        'height': '' + h + 'px',
        'line-height': '' + h + 'px',
        'top': '' + t + 'px',
        'left': '' + l + 'px',
        'font-size': '150%',
        'background-color': 'Gainsboro',
    });
    w = field.w * 0.2;
    l = field.w * 0.65;
    $('#diffHard').css({
        'width': '' + w + 'px',
        'height': '' + h + 'px',
        'line-height': '' + h + 'px',
        'top': '' + t + 'px',
        'left': '' + l + 'px',
        'font-size': '150%',
        'background-color': 'Gainsboro',
    });
};

game.setDifficulty = function(difficulty) {
    game.difficulty = difficulty;
    game.winningPoints = 40 + 10 * difficulty;
    $('#points').text('Points: ' + game.points + '/' + game.winningPoints);
    $('#diffEasy').css({
        'background-color': 'Gainsboro',
    });
    $('#diffNormal').css({
        'background-color': 'Gainsboro',
    });
    $('#diffHard').css({
        'background-color': 'Gainsboro',
    });
    var type = ['', '#diffEasy', '#diffNormal', '#diffHard'];
    $(type[difficulty]).css({
        'background-color': 'SlateGrey',
    });
};

game.displayStart = function() {
    $('<a id="startButton" class="gameObject infoButton" onclick="game.prepareStart()">Start</a>').appendTo('body');
    var w = field.w * 0.4;
    var h = field.h * 0.1;
    var t = field.h * 0.65;
    var l = field.w * 0.3;
    $('#startButton').css({
        'width': '' + w + 'px',
        'height': '' + h + 'px',
        'line-height': '' + h + 'px',
        'top': '' + t + 'px',
        'left': '' + l + 'px',
    });
};

game.prepareStart = function() {
    $('#info').remove();
    $('#infotext').remove();
    $('#diffEasy').remove();
    $('#diffNormal').remove();
    $('#diffHard').remove();
    $('#startButton').remove();
    game.clear();
    game.start();
};
