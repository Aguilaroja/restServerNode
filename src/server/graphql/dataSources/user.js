const { DataSource } = require('apollo-datasource');

const { createQrCode } = require('../../../routes/userRoute/getQrCode');

class UserAPI extends DataSource {
  constructor() {
    super();
  }

  initialize(config) {
    this.context = config.context;
  }

  qrCodeReducer(response) {
    return {
      image: response || null,
      err: response.err ? response.err.message : null,
      ok: response.ok
    };
  }

  async createQrCode(vcu, width = 350) {
    const response = await createQrCode(vcu, width);
    console.log({ response: response });
    return this.qrCodeReducer(response);
  }
}

module.exports = UserAPI;
