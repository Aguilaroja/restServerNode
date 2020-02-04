const { DataSource } = require('apollo-datasource');

const { createQrCode } = require('../../../routes/userRoute/getQrCode');

class UserAPI extends DataSource {
  constructor() {
    super();
  }

  initialize(config) {
    this.context = config.context;
  }

  async createQrCode(vcu, width = 350) {
    const response = await createQrCode(vcu, width);
    return response;
  }
}

module.exports = UserAPI;
