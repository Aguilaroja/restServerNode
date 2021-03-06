const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Usuario = require('../../server/models/usuario'); //Ésto es un objeto para el Schema
const ChargerCenter = require('../../server/models/charger_center'); //Ésto es un objeto para el Schema
const ServiceCenter = require('../../server/models/service_center'); //Ésto es un objeto para el Schema
const Client = require('../../server/models/client'); //Ésto es un objeto para el Schema
const ZynchScooter = require('../../server/models/zynch_scooter'); //Ésto es un objeto para el Schema
const ZynchPack = require('../../server/models/zynch_pack'); //Ésto es un objeto para el Schema
const config = require('../../server/config/services/config');

create = (req, res) => {
  let accion = req.params.create;
  let dato = req.body;

  if (accion === 'chargerCenter') {
    let charger_center = new ChargerCenter({
      //Instancia del Schema ChargerCenter
      name_center: dato.name_center,
      swaps_low: dato.swaps_low,
      swaps_medium: dato.swaps_medium,
      swaps_full: dato.swaps_full,
      total_swaps_available: dato.total_swaps_available,
      schedule_mf: dato.schedule_mf,
      schedule_sa: dato.schedule_sa,
      schedule_su: dato.schedule_su,
      service_today_open: dato.service_today_open,
      service_today_close: dato.service_today_close,
      latitude: dato.latitude,
      longitude: dato.longitude,
      address: dato.address
    });

    // save() es una palabra reservada de mongoose
    charger_center.save((err, chargerCenterDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }

      res.json({
        ok: true,
        charger_center: chargerCenterDB
      });
    });
  } else if (accion === 'serviceCenter') {
    let service_center = new ServiceCenter({
      //Instancia del Schema ServiceCenter
      name_center: dato.name_center,
      schedule_mf: dato.schedule_mf,
      schedule_sa: dato.schedule_sa,
      schedule_su: dato.schedule_su,
      service_today_open: dato.service_today_open,
      service_today_close: dato.service_today_close,
      phone_number: dato.phone_number,
      latitude: dato.latitude,
      longitude: dato.longitude,
      address: dato.address
    });

    // save() es una palabra reservada de mongoose
    service_center.save((err, serviceCenterDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }

      res.json({
        ok: true,
        service_center: serviceCenterDB
      });
    });
  } else if (accion === 'client') {
    let random = String(require('crypto').randomBytes(n));
    let bRandom = bcrypt.hashSync(random, 15);
    //Se genera el JWT
    let token = jwt.sign(
      {
        client: {
          id_client: bRandom,
          name_client: dato.name_client,
          address_client: dato.address_client
        }
      },
      config.seed,
      { expiresIn: config.caducidadToken }
    );

    let client = new Client({
      //Instancia del Schema Client
      id_client: token,
      name_client: dato.name_client,
      key_client: bcrypt.hashSync(token, 10),
      address_client: dato.address_client
    });

    // save() es una palabra reservada de mongoose
    client.save((err, clientDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }

      res.json({
        ok: true,
        client: clientDB
      });
    });
  } else if (accion === 'usuario') {
    let usuario = new Usuario({
      //Instancia del Schema Usuario
      nombre: dato.nombre,
      email: dato.email,
      password: bcrypt.hashSync(dato.password, 10), //bcrypt.hashSync sirve para encriptar de una sola vía la contraseña
      role: dato.role
    });

    //save() es una palabra reservada de mongoose
    usuario.save((err, usuarioDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }

      res.json({
        ok: true,
        usuario: usuarioDB
      });
    });
  } else if (accion === 'zynch_scooter') {
    let zynch_scooter = new ZynchScooter({
      id_user: dato.id_user,
      name_zynch: dato.name,
      vcu: dato.vcu
    });

    zynch_scooter.save((err, scooterDB) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err
        });
      }

      res.json({
        ok: true,
        scooter: scooterDB
      });
    });
  } else if (accion === 'zynch_pack') {
    let zynch_pack = new ZynchPack({
      name_pack: dato.name,
      id_user: dato.id_user,
      total_swaps: dato.total_swaps,
      available_swaps: dato.available_swaps,
      vcu: dato.vcu,
      valid_until: dato.valid_until,
      price: dato.price
    });

    zynch_pack.save((err, zynchPackDB) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err
        });
      }

      res.json({
        ok: true,
        zynch: zynchPackDB
      });
    });
  } else {
    res.status(500).json({
      ok: false,
      err: {
        message: 'Bad request'
      }
    });
  }
};

const createUser = async dato => {
  try {
    let usuario = new Usuario({
      //Instancia del Schema Usuario
      nombre: dato.nombre,
      email: dato.email,
      password: bcrypt.hashSync(dato.password, 10),
      role: dato.role
    });

    let document = await usuario.save();
    return { err: null, document };
  } catch (err) {
    console.log(err);
    return { err, document: null };
  }
};

const createChargerCenter = async dato => {
  try {
    let charger_center = new ChargerCenter({
      name_center: dato.name_center,
      swaps_low: dato.swaps_low,
      swaps_medium: dato.swaps_medium,
      swaps_full: dato.swaps_full,
      total_swaps_available: dato.total_swaps_available,
      schedule_mf: dato.schedule_mf,
      schedule_sa: dato.schedule_sa,
      schedule_su: dato.schedule_su,
      latitude: dato.latitude,
      longitude: dato.longitude,
      address: dato.address
    });
    let document = await charger_center.save();
    return { err: null, document };
  } catch (err) {
    return { err, document: null };
  }
};

const createServiceCenter = async dato => {
  try {
    let service_center = new ServiceCenter({
      name_center: dato.name_center,
      schedule_mf: dato.schedule_mf,
      schedule_sa: dato.schedule_sa,
      schedule_su: dato.schedule_su,
      service_today_open: dato.service_today_open,
      service_today_close: dato.service_today_close,
      phone_number: dato.phone_number,
      latitude: dato.latitude,
      longitude: dato.longitude,
      address: dato.address
    });
    let document = await service_center.save();
    return { err: null, document };
  } catch (err) {
    return { err, document: null };
  }
};

const createZynchPack = async zynchPack => {
  try {
    let zynch_pack = new ZynchPack({
      name_pack: zynchPack.name,
      id_user: zynchPack.id_user,
      total_swaps: zynchPack.total_swaps,
      available_swaps: zynchPack.available_swaps,
      vcu: zynchPack.vcu,
      valid_until: zynchPack.valid_until,
      price: zynchPack.price
    });
    const document = await zynch_pack.save();
    return { err: null, document };
  } catch (err) {
    return { err, zynchPack: null };
  }
};

const createScooter = async dato => {
  try {
    let zynch_scooter = new ZynchScooter({
      id_user: dato.id_user,
      name_zynch: dato.name,
      vcu: dato.vcu
    });

    let document = await zynch_scooter.save();
    return { err: null, document };
  } catch (err) {
    return { err, document: null };
  }
};

const createClient = async dato => {
  try {
    let random = String(require('crypto').randomBytes(16));
    let bRandom = bcrypt.hashSync(random, 15);
    //Se genera el JWT
    let token = jwt.sign(
      {
        client: {
          id_client: bRandom,
          name_client: dato.name_client,
          address_client: dato.address_client
        }
      },
      config.seed,
      { expiresIn: config.caducidadToken }
    );
    let client = new Client({
      id_client: token,
      name_client: dato.name_client,
      key_client: bcrypt.hashSync(token, 10),
      address_client: dato.address_client
    });
    let document = await client.save();
    return { err: null, document };
  } catch (err) {
    return { err, document: null };
  }
};

module.exports = {
  create,
  createChargerCenter,
  createServiceCenter,
  createUser,
  createZynchPack,
  createScooter,
  createClient
};
