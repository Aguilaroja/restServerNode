const { DataSource } = require('apollo-datasource');

const { createQrCode } = require('../../../routes/userRoute/getQrCode');
const { createUser } = require('../../../routes/userRoute/create');

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

  async createUser(user) {
    const response = await createUser(user);
    if (!response.err) return response.document;
    else return response.err;
  }
}

module.exports = UserAPI;
