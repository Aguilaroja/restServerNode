//Puerto
puerto = process.env.PORT || 3000;

//Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//BD
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb+srv://spacebar:dWfPnpPEje2LVkk7@cluster0-6j0uf.mongodb.net/cafe';
}

process.env.URLDB = urlDB;