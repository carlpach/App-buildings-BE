const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const {CloudinaryStorage} = require('multer-storage-cloudinary');

//requestoriginal --> 
    //midleware que coge esa request, 
    //multer transforma la peticion, 
    //cogemos el parametro de la imagen lo mandamos a nuestro storage
    //el storage lo almacena en cloudinary en la nube y nos da la url
    //ponemos esa url en la request
    //de la request modificada cogeremos la url que nos ha dado cloudinary y la pondremos en el valor que nosotros queramos

const storage = new CloudinaryStorage(
    {
        cloudinary: cloudinary,
        params: {
            folder: 'Properties',
            allowedFormats: ['jpg', 'png', 'jpeg', 'gif', 'webp', 'pdf']
        }
    }
);

const upload = multer({ storage });

module.exports = upload;
