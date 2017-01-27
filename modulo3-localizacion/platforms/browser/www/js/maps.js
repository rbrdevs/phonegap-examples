// https://github.com/h4ckademy/mooc-mobile-maps

var app={
    inicio: function() {
        this.iniciaFastClick();        
    },

    iniciaFastClick: function() {
        FastClick.attach(document.body);
    },

    dispositivoListo: function() {
        navigator.geolocation.getCurrentPosition(app.dibujaCoordenadas, app.errorAlSolicitarLocalizaacion);    
    },

    dibujaCoordenadas: function(position) {
        var coordsDiv = document.querySelector('#coords');
        coordsDiv.innerHTML = 'Latitud:' + position.coords.latitude + ' Longitud:' + position.coords.longitude;
    },
    
    errorAlSolicitarLocalizaacion: function(error) {
        console.log(error.code + ': '+error.message);
    }
};

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        app.inicio();
    }, false);
    document.addEventListener('deviceready', function() {
        app.dispositivoListo();
    }, false);

}
