
function rad(deg) {
  return deg * (Math.PI/180);
}

function randPos() {
    var res = [];
    res.x = random(field.size);
    res.y = random(field.size);
    var distance = Math.sqrt(Math.abs(res.x) * Math.abs(res.x) + Math.abs(res.y) * Math.abs(res.y));
    if (distance > (player.size * 4)) {
        return res;
    } else {
        return randPos();
    }
}

function random(max) {
    return Math.floor(Math.random() * max * 2 - max);
}

function randSize() {
    return Math.floor(player.size / 2 + Math.random() * player.size * 2);
}

function isIOS() {
  return [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod'
    ].includes(navigator.platform);
}
