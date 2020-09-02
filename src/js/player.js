
var player = [];
player.size = 0;
player.speed = 1;

player.create = function() {
    player.speed = game.difficulty;
    var minSide = Math.min(field.h, field.w);
    var size = minSide / 8;
    player.size = size;
    var left = (field.w - size) / 2;
    var top = (field.h - size) / 2;
    $('<div id="player" class="rounded gameObject"></div>').appendTo('body');
    $('#player').css({
        'width': '' + size + 'px',
        'height': '' + size + 'px',
        'left': '' + left + 'px',
        'top': '' + top + 'px',
    });
    size *= 1.5;
    left = (field.w - size) / 2;
    top = (field.h - size) / 2;
    $('<canvas id="playerDirection" class="gameObject"></canvas>').appendTo('body');
    $('#playerDirection').css({
        'width': '' + size + 'px',
        'height': '' + size + 'px',
        'left': '' + left + 'px',
        'top': '' + top + 'px',
    });
};

player.update = function() {
    var l = player.size / 2;
    var c = sensor.compass - 90;
    var cp = c + 60;
    var cm = c - 60;
    var canvas = document.getElementById('playerDirection');
    var cenX = canvas.width / 2;
    var cenY = canvas.height / 2;
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'FireBrick';
    context.beginPath();
    context.moveTo(cenX + cenX / 2 * Math.cos(rad(cm)), cenY + cenY / 2 * Math.sin(rad(cm)));
    context.lineTo(cenX + cenX * Math.cos(rad(c)), cenY + cenY * Math.sin(rad(c)));
    context.lineTo(cenX + cenX / 2 * Math.cos(rad(cp)), cenY + cenY / 2 * Math.sin(rad(cp)));
    context.closePath();
    context.fill();
};

player.clear = function() {
    $('#player').remove();
    $('#playerDirection').remove();
};

player.accelerate = function() {
    player.speed += game.difficulty;
};

player.decelerate = function() {
    player.speed -= game.difficulty;

    if (player.speed <= 0) {
        if (game.difficulty == 1) {
            player.speed = game.difficulty;
        } else {
            game.lost();
        }
    }
};
