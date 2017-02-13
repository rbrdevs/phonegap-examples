/**
 * Es necesario instalar el plugin cordova-plugin-device-motion
 * https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-device-motion/index.html
 * 
 * Requiere la librería Phaser.io http://phaser.io/
 * 
 * > cordova plugin add cordova-plugin-device-motion
 * > cordova prepare
 */

var app={
    inicio: function() {
        DIAMETRO_BOLA = 50;
        alto = document.documentElement.clientHeight;
        ancho = document.documentElement.clientWidth;

        velocidadX = 0;
        velocidadY = 0;
        puntuacion = 0;

        app.vigilaSensores();
        app.iniciaJuego();
    },
    iniciaJuego: function() {
        function preload() {
            game.physics.startSystem(Phaser.Physics.ARCADE);

            game.stage.backgroundColor = '#f27d0c';
            game.load.image('bola','assets/bola.png');
        }

        function update() {
            bola.body.velocity.y = (velocidadY * 300);
            bola.body.velocity.x = (velocidadX * -300);
        }

        function create() {
            scoreText = game.add.text(16,16, puntuacion, {fontSize: '100px',fill: '#757676'});
            bola = game.add.sprite(app.inicioX(), app.inicioY(), 'bola');             
            game.physics.arcade.enable(bola);           
            bola.body.collideWorldBounds = true;
            bola.body.onWorldBounds = new Phaser.Signal();
            bola.body.onWorldBounds.add(app.decrementaPuntacion, this);
        }

        var estados = { preload: preload, create: create, update: update};
        var game = new Phaser.Game(ancho,alto,Phaser.CANVAS, 'phaser',estados);
    },

    decrementaPuntacion: function() {
        console.log('decrementaPuntacion');
        puntuacion = puntuacion - 1;
        scoreText.text = puntuacion;
    },

    inicioX: function() {
        return app.numeroAleatorioHasta(ancho - DIAMETRO_BOLA);
    },
    
    inicioY: function() {
        return app.numeroAleatorioHasta(alto - DIAMETRO_BOLA);
    },

    numeroAleatorioHasta: function(limite) {
        return Math.floor(Math.random() * limite);
    },

    vigilaSensores: function() {
        function onError() {
            console.log("onError");
        }

        function onSuccess(datosAceleracion) {
            app.detectaAgitacioin(datosAceleracion);
            app.registraDireccion(datosAceleracion);
        }

        navigator.accelerometer.watchAcceleration(onSuccess, onError, { frequency: 10});
    },

    detectaAgitacioin: function(datosAceleracion) {
        agitacionX = datosAceleracion.x >10;
        agitacionY = datosAceleracion.y > 10;

        if (agitacionX || agitacionY) {
            console.log('agitado');
        }
    },

    recomienza: function() {
        document.location.reload(true);
    },

    registraDireccion: function(datosAceleracion) {
        velocidadX = datosAceleracion.x;
        velocidadY = datosAceleracion.y;
    }

    
};


if ('addEventListener' in document) {
    document.addEventListener('deviceready', function() {
        app.inicio();
    }, false);
}
