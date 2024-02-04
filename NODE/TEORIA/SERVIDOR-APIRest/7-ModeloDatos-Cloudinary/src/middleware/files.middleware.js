//? -----------Importaciones--------------------------------

const multer = require("multer")
const cloudinary = require("cloudinary").v2;
const {CloudinaryStorage} = require("multer-storage-cloudinary");
const dotenv = require("dotenv");
dotenv.config();

//?-----------Creamos el almacenamiento---------------------

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "Pruebas",
        allowedFormats: ["jpg", "png", "jpeg", "gif", "svg", "webp"],
    },    
});

//? ----------Funcion que sube las imagenes------------------

const upload = multer({ storage });

//?---------Función de borrado de imagenes en cloudinary-----

// Se crea por si ha habido un error en la creación del usuario y se debe borrar la imagen

const deleteImgCloudinary = (imgUrl) => {
    const imgSplited = imgUrl.split("/");
    const nameSplited = imgSplited[imgSplited.length - 1].split(".");
    const folderSplited = imgSplited[imgSplited.length - 2];
    const public_id = `${folderSplited}/${nameSplited[0]}`;

    cloudinary.uploader.destroy(public_id, () => {
        console.log("Image delete in cloudinary");
      });
    };

//?Función de configuración de cloudinary con variables de entorno--

const configCloudinary = () => {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      api_key: process.env.CLOUDINARY_API_KEY,
    });
  };

  module.exports = {upload, deleteImgCloudinary, configCloudinary };


