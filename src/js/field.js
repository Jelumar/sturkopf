
var field = [];
field.w = 0;
field.h = 0;
field.size = 0;
field.obstacles = [];
field.targets = [];
field.border = [];
field.border.xMax = 0;
field.border.xMin = 0;
field.border.yMin = 0;
field.border.yMax = 0;
field.borderHide = 0;

field.create = function() {
    field.w = $(window).width();
    field.h = $(window).height();
    $('<canvas id="border" class="gameObject"></canvas>').appendTo('body');
    $('#border').css({
        'width': '100%',
        'height': '100%',
        'left': '0px',
        'top': '0px',
    });
    var canvas = document.getElementById('border');
    canvas.width = field.w;
    canvas.height = field.h;
    field.size = Math.max(field.h, field.w) * 1.5;
    field.border.xMax = field.size;
    field.border.xMin = -field.size;
    field.border.yMin = field.size;
    field.border.yMax = -field.size;

    $('<div id="points" class="gameObject gameInfo"></div>').appendTo('body');
    $('<div id="speed" class="gameObject gameInfo"></div>').appendTo('body');
    $('<div id="light" class="gameObject gameInfo"></div>').appendTo('body');
    $('#points').text('Points: ' + game.points + '/' + game.winningPoints);
    $('#speed').text(player.speed + ' :Speed');
    $('#light').text(sensor.lightlevel + ' ' + sensor.light + ' :Light');
};

field.createGameObjects = function() {
    var pos;
    for (i = 0; i < 100; i++) {
        pos = randPos();
        field.obstacles[i] = new Obstacle(pos.x, pos.y, randSize(), i);
    }
    for (i = 0; i < 60; i++) {
        var type = 1;
        if (i < 20) {
            type = 1;
        } else if (i < 40) {
            type = 2;
        } else {
            type = 3;
        }
        pos = randPos();
        field.targets[i] = new Target(pos.x, pos.y, type, i);
    }
    field.borderHide = player.size / 2 + player.size * 2;
    $('<div id="hiderRight" class="gameObject hider"></div>').appendTo('body');
    $('#hiderRight').css({
        'width': '' + field.borderHide + 'px',
        'height': '' + field.h + 'px',
        'left': '' + field.w + 'px',
        'top': '0px',
    });
    $('<div id="hiderBot" class="gameObject hider"></div>').appendTo('body');
    $('#hiderBot').css({
        'width': '' + (field.borderHide + field.w) + 'px',
        'height': '' + field.borderHide + 'px',
        'left': '0px',
        'top': '' + field.h + 'px',
    });
};

field.update = function(dx, dy) {
    for (i = 0; i < field.obstacles.length; i++) {
        field.obstacles[i].update(dx, dy);
    }
    for (i = 0; i < field.targets.length; i++) {
        field.targets[i].update(dx, dy);
    }

    $('#points').text('Points: ' + game.points + '/' + game.winningPoints);
    $('#speed').text(player.speed + ' :Speed');
    $('#light').text(sensor.lightlevel + ' ' + sensor.light + ' :Light');

    field.border.xMax += dx;
    field.border.xMin += dx;
    field.border.yMin += dy;
    field.border.yMax += dy;

    var canvas = document.getElementById('border');
    var cenX = canvas.width / 2;
    var cenY = canvas.height / 2;
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'Gainsboro';
    context.beginPath();
    context.moveTo(cenX + field.border.xMax, cenY - field.border.yMax);
    context.lineTo(cenX + field.border.xMax, cenY - field.border.yMin);
    context.lineTo(cenX + field.border.xMin, cenY - field.border.yMin);
    context.lineTo(cenX + field.border.xMin, cenY - field.border.yMax);
    context.closePath();
    context.fill();

    var limit = player.size / 2;
    var distxMax = Math.abs(field.border.xMax);
    var distxMin = Math.abs(field.border.xMin);
    var distyMin = Math.abs(field.border.yMin);
    var distyMax = Math.abs(field.border.yMax);
    if (distxMax <= limit || distxMin <= limit || distyMin <= limit || distyMax <= limit) {
        game.lost();
    }
};

field.clear = function() {
    var element;
    for (i = 0; i < field.obstacles.length; i++) {
        $('#o' + i).remove();
    }
    for (i = 0; i < field.targets.length; i++) {
        $('#t' + i).remove();
    }
    field.obstacles = [];
    field.targets = [];
    var canvas = document.getElementById('border');
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    $('#border').remove();
    $('#points').remove();
    $('#speed').remove();
    $('#light').remove();
    $('#hiderRight').remove();
    $('#hiderBot').remove();
};
