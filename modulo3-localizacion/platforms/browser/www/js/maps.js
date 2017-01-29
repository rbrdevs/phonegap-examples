// https://github.com/h4ckademy/mooc-mobile-maps

var app={
    inicio: function() {
        this.iniciaFastClick();        
    },

    iniciaFastClick: function() {
        FastClick.attach(document.body);
    },

    dispositivoListo: function() {
        navigator.geolocation.getCurrentPosition(app.pintaCoordenadasEnMapa, app.errorAlSolicitarLocalizaacion);    
    },

	pintaCoordenadasEnMapa: function(position) {
		// 'L' hace referencia a un objeto de la librería leaflet.js
		var miMapa = L.map('map').setView([position.coords.latitude, position.coords.longitude], 13);

		L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmJyZGV2cyIsImEiOiJjaXlpejRtZHcwMDR5MnFueDQ2M29lOXB1In0.WXkJ-mpQo1MbbD4n9mvgGQ', {
      		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
		    maxZoom: 18
    	}).addTo(miMapa);

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
