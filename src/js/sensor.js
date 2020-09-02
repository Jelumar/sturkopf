
var sensor = [];
sensor.compass = 0;
sensor.beta = 0;
sensor.light = 0;
sensor.lightlevel = 'none';

sensor.registerSensorListeners = function() {
    if (isIOS()) {
        if ( typeof( DeviceOrientationEvent ) !== "undefined" && typeof( DeviceOrientationEvent.requestPermission ) === "function" ) {
            DeviceOrientationEvent.requestPermission()
                .then(sensor.safelyRegisterSensorListeners)
                .catch(console.error);
        }
    } else {
        sensor.safelyRegisterSensorListeners();
    }
};

sensor.safelyRegisterSensorListeners = function() {
    if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', sensor.compassHandler, true);
    }
    if (window.DeviceLightEvent) {
        window.addEventListener('devicelight', sensor.lightHandler, true);
    }
    if(window.DeviceLightEvent){
        window.addEventListener("lightlevel", sensor.lightLevelHandler, true);
    }
    if ('onorientationchange' in window) {
        window.addEventListener("orientationchange", sensor.orientationChangeHandler);
    }
};

sensor.removeSensorListeners = function() {
    window.removeEventListener("deviceorientation", sensor.compassHandler);
    window.removeEventListener("devicelight", sensor.lightHandler);
    window.removeEventListener("lightlevel", sensor.lightLevelHandler);
    window.removeEventListener("orientationchange", sensor.orientationChangeHandler);
    sensor.betaComp = null;
};

sensor.compassHandler = function(e) {
    sensor.compass = e.alpha;
    sensor.beta = e.beta;
    if (sensor.betaComp == null) {
        sensor.betaComp = sensor.beta;
    }
    if (Math.abs(sensor.betaComp - sensor.beta) > 30) {
        if (!game.paused) {
            game.pause();
        }
    }
};

sensor.lightHandler = function(e) {
    sensor.light = e.value;
};

sensor.lightLevelHandler = function(e) {
    sensor.lightlevel = e.value;
};

sensor.orientationChangeHandler = function(e) {
    game.forcePaused = !game.forcePaused;
    if (game.forcePaused) {
        alert('Die Bildschirmausrichtung wurde verändert. Rückgängig machen, um das Spiel fortzusetzen.');
    }
};
