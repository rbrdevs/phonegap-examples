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
        var img = document.createElement('img');
        img.onload = function() {
            app.pintarFoto(img);
        }        
        img.src = imageURI;
    },

    pintarFoto: function(img) {
        console.log("hola");
        var canvas = document.querySelector('#foto');
        var context = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img,0,0,img.width,img.height);
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
