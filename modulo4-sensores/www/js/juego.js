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

        dificultad = 0;
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
            game.load.image('objetivo','assets/objetivo.png');            
        }

        function update() {
            var factorDificultad = (300 + (dificultad * 100));
            bola.body.velocity.y = (velocidadY * factorDificultad);
            bola.body.velocity.x = (velocidadX * (factorDificultad * -1));

            game.physics.arcade.overlap(bola,objetivo, app.incrementaPuntuacion, null, this);
        }

        function create() {
            scoreText = game.add.text(16,16, puntuacion, {fontSize: '100px',fill: '#757676'});
            objetivo = game.add.sprite(app.inicioX(), app.inicioY(), 'objetivo');                         
            bola = game.add.sprite(app.inicioX(), app.inicioY(), 'bola');             
            game.physics.arcade.enable(bola);           
            game.physics.arcade.enable(objetivo);                       
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

    incrementaPuntuacion: function() {
        puntuacion = puntuacion+1;
        scoreText.text = puntuacion;

        objetivo.body.x = app.inicioX();
        objetivo.body.y = app.inicioY();

        if (puntuacion >0 ) {
            dificultad = dificultad +1;
        }
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
            setTimeout(app.recomienza, 1000);
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
