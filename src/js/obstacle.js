function Obstacle(x, y, size, n) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.id = n;
    $('<div id="o' + n + '" class="rounded gameObject obstacle"></div>').appendTo('body');
    $('#o' + n).css({
        'width': '' + size + 'px',
        'height': '' + size + 'px',
    });

    this.update = function(dx, dy) {
        this.x += dx;
        this.y += dy;
        var limit = (player.size + this.size) / 2;
        var distance = Math.sqrt(Math.abs(this.x) * Math.abs(this.x) + Math.abs(this.y) * Math.abs(this.y));
        if (distance <= limit) {
            game.lost();
        }
        var left = field.w / 2 + this.x - this.size / 2;
        var bot = field.h / 2 + this.y - this.size / 2;
        $('#o' + this.id).css({
            'left': '' + Math.min(left, field.w) + 'px',
            'bottom': '' + Math.max(bot, -field.borderHide) + 'px',
        });
    };
}
