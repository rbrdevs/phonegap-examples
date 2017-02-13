/**
 * Es necesario instalar el plugin cordova-plugin-device-motion
 * https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-device-motion/index.html
 * 
 * > cordova plugin add cordova-plugin-device-motion
 * > cordova prepare
 */

var app={
    inicio: function() {
        function onError() {
            console.log('onError');
        }

        navigator.accelerometer.watchAcceleration(this.onSuccess, onError,{ frequency: 1000});
    },
    onSuccess: function(datosAceleracion) {
        app.detectaAgitacioin(datosAceleracion);
        app.representaValores(datosAceleracion);
    },
    detectaAgitacioin: function(datosAceleracion) {
        agitacionX = datosAceleracion.x >10;
        agitacionY = datosAceleracion.y > 10;

        if (agitacionX || agitacionY) {
            document.body.className = 'agitado';
        } else {
            document.body.className = '';
        }
    },
    representaValores: function(datosAceleracion) {
        app.representa(datosAceleracion.x,'#valorx');
        app.representa(datosAceleracion.y,'#valory');
        app.representa(datosAceleracion.z,'#valorz');        
    },
    representa: function(dato, elementoHTML) {
        redondeo = Math.round(dato * 100) / 100;
        document.querySelector(elementoHTML).innerHTML = redondeo;
    }
};


if ('addEventListener' in document) {
    document.addEventListener('deviceready', function() {
        app.inicio();
    }, false);
}
