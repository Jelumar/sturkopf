
var tic = [];
tic.interval = null;
tic.funcs = [];

tic.init = function(duration) {
    tic.interval = setInterval(tic.tic, duration);
};

tic.deinit = function() {
    tic.funcs = [];
    clearInterval(tic.interval);
};

tic.tic = function() {
    for(var key in tic.funcs){
        tic.funcs[key]();
    }
};

tic.add = function(name, func) {
    tic.funcs[name] = func;
};

tic.remove = function(name) {
    tic.funcs[name] = function() {};
};
