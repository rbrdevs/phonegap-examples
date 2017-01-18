var app={
    inicio: function() {
        this.iniciaFastClick();
        this.iniciaBotones();
    },

    iniciaFastClick: function() {
        FastClick.attach(document.body);
    },

    iniciaBotones: function() {
        var botonAction = document.querySelector('#button-action');
        botonAction.addEventListener('click', this.tomarFoto);
    },
    
    tomarFoto: function() {
        var opciones = {
            quality: 50,
            //sourceType: pictureSourceType,
            destinationType: Camera.DestinationType.FILE_URI,
            targetWidth: 300,
            targetHeight: 300,
            correctOrientation: true
        }
        navigator.camera.getPicture(app.fotoTomada, app.errorAlTomarFoto, opciones);
    },

    fotoTomada: function(imageURI) {
        var image = document.querySelector('#foto');
        image.src = imageURI;
    },

    errorAlTomarFoto: function(message) {
        console.log('Fallo al tomar foto o toma cancelada: '+message);
    }


};

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        app.inicio();
    }, false);
}
