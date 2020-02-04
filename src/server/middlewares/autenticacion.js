//Marco de servidor
const { config } = require('../config/');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario'); //Ésto es un objeto para el Schema
const TokenLogin = require('../models/token_login'); //Ésto es un objeto para el Schema
const Client = require('../models/client'); //Ésto es un objeto para el Schema

//Verificar TokenDB
let verificaTokenDB = (req, res, next) => {
  let token = req.get('token'); //Éste es el token que viene en los HEADERS al hacer la petición
  TokenLogin.findOne({ tokenLog: token }, (err, tokenLoginDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err
      });
    }
    if (!tokenLoginDB) {
      return res.json({
        ok: false,
        message: 'Token incorrecto'
      });
    }
    Usuario.findOne({ email: tokenLoginDB.email }, (err, usuarioDB) => {
      if (err) {
        return (
          res.status(500),
          json({
            ok: false,
            err
          })
        );
      }
      if (!usuarioDB) {
        return res.status(400).json({
          ok: false,
          err: {
            message: 'No se encontró token->usuario'
          }
        });
      }
      req.user = usuarioDB;
      next();
    });
  });
};

//El siguiente código es para verificar el token con caducidad por JWT
let verificaTokenJWT = (req, res, next) => {
  // let token = req.get('token'); //Éste es el token que viene en los HEADERS al hacer la petición
  let token = req.body.token;

  verifyJwtToken(token, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        ok: false,
        err
      });
    } else {
      req.user = decoded.user;
      next();
    }
  });
};

//Verifica AdminRole
let verificaAdminRole = (req, res, next) => {
  let user = req.user;

  if (user.role === 'ADMIN_ROLE') {
    next();
  } else {
    return res.json({
      ok: false,
      err: {
        message: 'El usuario no es administrador'
      }
    });
  }
};

let verificaCliente = async (req, res, next) => {
  let id = req.get('id');
  let key = req.get('key_client');
  const { err, client } = await findClientByKeyAndId(id, key);
  if (err) {
    return res.status(500).json({
      ok: false,
      err
    });
  } else if (!client) {
    return res.status(400).json({
      ok: false,
      err: {
        message: 'Autenticación errónea'
      }
    });
  }
  req.dataClient = client;
  next();
};

const verifyJwtToken = (token, callback) => {
  jwt.verify(token, config.seed, (err, decoded) => {
    callback(err, decoded);
  });
};

const verifyAdminRole = user => {
  if (user.role === 'ADMIN_ROLE') {
    return true;
  } else {
    return false;
  }
};

const findClientByKeyAndId = async (id_client, key_client) => {
  try {
    const client = await Client.findOne({ key_client, id_client });
    return { err: null, client };
  } catch (err) {
    return { err, client: null };
  }
};

module.exports = {
  verificaTokenDB,
  verificaTokenJWT,
  verificaAdminRole,
  verificaCliente,
  findClientByKeyAndId,
  verifyAdminRole
};
