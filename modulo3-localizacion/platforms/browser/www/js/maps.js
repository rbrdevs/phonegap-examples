// https://github.com/h4ckademy/mooc-mobile-maps

/**
 * Es necesario instalar el plugin whitelist 
 * https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-whitelist/
 * 
 * > cordova plugin add cordova-plugin-whitelist
 * > cordova prepare
 */

var app={
    watchPosition : undefined,
    miMapa: undefined,
    marcador: undefined,
    circle: undefined,
    inicio: function() {
        this.iniciaFastClick(); 
        this.iniciaBotones();       
    },

    iniciaFastClick: function() {
        FastClick.attach(document.body);
    },

    iniciaBotones: function() {
        var botonStart = document.querySelector('#button-start');
        botonStart.addEventListener('click', function() {
            app.watchPosition = app.startWatchMapPosition();
        });
        var botonStop = document.querySelector('#button-stop');
        botonStop.addEventListener('click', function() {
            app.stopWatchMapPosition();
        });
    },


    dispositivoListo: function() {
        navigator.geolocation.getCurrentPosition(app.pintaCoordenadasEnMapa, app.errorAlSolicitarLocalizaacion);    
    },

	pintaCoordenadasEnMapa: function(position) {
		// 'L' hace referencia a un objeto de la librería leaflet.js
		app.miMapa = L.map('map').setView([position.coords.latitude, position.coords.longitude], 13);

		L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmJyZGV2cyIsImEiOiJjaXlpejRtZHcwMDR5MnFueDQ2M29lOXB1In0.WXkJ-mpQo1MbbD4n9mvgGQ', {
      		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
		    maxZoom: 18
    	}).addTo(app.miMapa);
 

        var greenIcon = L.icon({
            iconUrl: 'http://leafletjs.com/examples/custom-icons/leaf-green.png',
            shadowUrl: 'http://leafletjs.com/examples/custom-icons/leaf-shadow.png',

            iconSize:     [38, 95], // size of the icon
            shadowSize:   [50, 64], // size of the shadow
            iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
            shadowAnchor: [4, 62],  // the same for the shadow
            popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
        });

        //app.pintaMarcador([position.coords.latitude,position.coords.longitude],'¡Estoy aquí!', miMapa);
        app.marcador = L.marker([position.coords.latitude,position.coords.longitude], {icon: greenIcon}).addTo(app.miMapa);
        app.marcador.bindPopup('¡Estoy aquí!').openPopup();
        

        app.circle = L.circle([position.coords.latitude, position.coords.longitude], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 1000
        }).addTo(app.miMapa);

        app.miMapa.on('click', function(evento) {
            var texto = 'Marcador en l('+evento.latlng.lat.toFixed(2)+') y L('+evento.latlng.lng.toFixed(2)+')';
            app.pintaMarcador(evento.latlng,texto,app.miMapa);
        });
    },
    
    pintaMarcador: function(latlng, texto, mapa) {
        var marcador = L.marker(latlng).addTo(mapa);
        marcador.bindPopup(texto).openPopup();
    },

    errorAlSolicitarLocalizaacion: function(error) {
        console.log(error.code + ': '+error.message);
    },


    onMapWatchSuccess: function (position) {
        console.log(position.coords.latitude+' - '+position.coords.longitude);
        var updatedLatitude = position.coords.latitude;
        var updatedLongitude = position.coords.longitude;

        //if (updatedLatitude != Latitude && updatedLongitude != Longitude) {
        app.miMapa.setView([updatedLatitude, updatedLongitude]);
        app.marcador.setLatLng([updatedLatitude, updatedLongitude]);
        app.circle.setLatLng([updatedLatitude, updatedLongitude]);
        //}
    },

    // Watch your changing position

    startWatchMapPosition: function() {
        console.log("start");
        return navigator.geolocation.watchPosition
        (app.onMapWatchSuccess, app.errorAlSolicitarLocalizaacion, { enableHighAccuracy: true });
    },
    stopWatchMapPosition: function() {
        console.log("stop");
        navigator.geolocation.clearWatch(app.watchPosition);
    },        
};

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        app.inicio();
    }, false);
    document.addEventListener('deviceready', function() {
        app.dispositivoListo();
    }, false);

}
