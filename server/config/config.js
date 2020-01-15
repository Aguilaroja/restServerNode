//Puerto
process.env.PORT = process.env.PORT || 3000;

//Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//Vencimiento del token
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30 * 30; //30 días (creo)

//Seed de autenticación
process.env.SEED = process.env.SEED || 'este-es-el-seed-de-desarrollo';

//BD
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/spacebar';
} else {
    //Ésta variable de entorno es para que no esté pública el usuario y contraseña de la DB de MongoAtlas
    urlDB = process.env.MONGO_URL;
}

process.env.URLDB = urlDB;