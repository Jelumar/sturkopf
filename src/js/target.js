function Target(x, y, type, n) {
    this.x = x;
    this.y = y;
    this. points = type;
    this.active = true;
    var cssClass = '';
    if (type == 1) {
        this.size = player.size * 0.75;
        cssClass = 'slow';
        this.speedChanger = player.decelerate;
    } else if (type == 2) {
        this.size = player.size * 1;
        cssClass = 'eqal';
        this.speedChanger = function() {};
    } else {
        this.size = player.size * 1.25;
        cssClass = 'fast';
        this.speedChanger = player.accelerate;
    }
    this.id = n;
    $('<div id="t' + n + '" class="rounded gameObject target ' + cssClass + '"></div>').appendTo('body');
    $('#t' + n).css({
        'width': '' + this.size + 'px',
        'height': '' + this.size + 'px',
    });

    this.update = function(dx, dy) {
        if (this.active) {
            this.x += dx;
            this.y += dy;
            var limit = (player.size + this.size) / 2;
            var distance = Math.sqrt(Math.abs(this.x) * Math.abs(this.x) + Math.abs(this.y) * Math.abs(this.y));
            if (distance <= limit) {
                this.speedChanger();
                game.points += this.points;
                $('#t' + this.id).remove();
                this.active = false;
            }
            var left = field.w / 2 + this.x - this.size / 2;
            var bot = field.h / 2 + this.y - this.size / 2;
            $('#t' + this.id).css({
                'left': '' + Math.min(left, field.w) + 'px',
                'bottom': '' + Math.max(bot, -field.borderHide) + 'px',
            });
        }
    };
}
