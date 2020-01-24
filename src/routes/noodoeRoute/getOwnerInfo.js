const axios = require('axios');
const log = require('../../server/config');

getOwnerinfo = (req, res) => {
  let ownerId = req.body.ownerId;
  let ownerType = req.body.ownerType;

  const info = async (ownerId, ownerType) => {
    const respuesta = await axios({
      method: 'POST',
      url: `https://iusa-dev.server.noodoe.com/getOwnerInfo`,
      data: {
        ownerId: ownerId,
        ownerType: ownerType
      }
    })
      .then(response => {
        log.debug(response.data);
        return response.data;
      })
      .catch(err => {
        log.error(err);
        return err;
      });

    return respuesta;
  };

  info(ownerId, ownerType)
    .then(response => {
      res.json({
        response
      });
    })
    .catch(err => {
      res.json({
        err
      });
    });
};

module.exports = getOwnerinfo;
