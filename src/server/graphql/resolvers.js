const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const { AuthenticationError } = require('../exceptions');

const resolverMap = {
  Query: {
    chargeCenters: async (_, { location = null }, context) => {
      const { dataSources } = context;
      console.log(context.client);
      if (!context.client) throw new AuthenticationError();
      const response = await dataSources.zynchApi.getChargerCenters(location);
      return response;
    },
    serviceCenters: async (_, { location = null }, context) => {
      const { dataSources } = context;
      if (!context.client) throw new AuthenticationError();
      const response = await dataSources.zynchApi.getServiceCenters(location);
      return response;
    }
  },
  Mutation: {
    createUser: async (_, { nombre, email, password, role }, context) => {
      const { dataSources } = context;
      if (!context.client) throw new AuthenticationError();
      const response = await dataSources.userAPI.createUser({ nombre, email, password, role });
      return response;
    },
    createQrCode: async (_, { vcu, width = 640 }, context) => {
      const { dataSources } = context;
      if (!context.client) throw new AuthenticationError();
      const response = await dataSources.userAPI.createQrCode(vcu, width);
      return response;
    },
    createChargerCenter: async (_, params, context) => {
      const { dataSources } = context;
      if (!context.client) throw new AuthenticationError();
      const response = await dataSources.zynchApi.createChargerCenter({
        name_center: params.name,
        address: params.address,
        latitude: params.location.latitude,
        longitude: params.location.longitude,
        swaps_low: params.swapsLow,
        swaps_medium: params.swapsMedium,
        swaps_full: params.swapsFull,
        total_swaps_available: params.totalSwapsAvailable,
        schedule_mf: params.scheduleMonFri,
        schedule_sa: params.scheduleSaturday,
        schedule_su: params.scheduleSunday
      });
      return response;
    },
    createServiceCenter: async (_, params, context) => {
      const { dataSources } = context;
      if (!context.client) throw new AuthenticationError();
      const response = await dataSources.zynchApi.createServiceCenter({
        name_center: params.name,
        address: params.address,
        phone_number: params.phoneNumber,
        latitude: params.location.latitude,
        longitude: params.location.longitude,
        schedule_mf: params.scheduleMonFri,
        schedule_sa: params.scheduleSaturday,
        schedule_su: params.scheduleSunday
      });
      return response;
    },
    createScooter: async (_, { name, userId, vcu }, context) => {
      const { dataSources } = context;
      if (!context.client) throw new AuthenticationError();
      const response = await dataSources.zynchApi.createScooter({
        name,
        id_user: userId,
        vcu
      });
      return response;
    },
    createZynchPack: async (_, params, context) => {
      const { dataSources } = context;
      if (!context.client) throw new AuthenticationError();
      const response = await dataSources.zynchApi.createZynchPack({
        name: params.name,
        id_user: params.userId,
        total_swaps: params.totalSwaps,
        available_swaps: params.swapsAvailable,
        price: params.price,
        vcu: params.vcu
      });
      return response;
    },
    createClient: async (_, { name, address }, context) => {
      const { dataSources } = context;
      if (!context.client) throw new AuthenticationError();
      const response = await dataSources.zynchApi.createClient({
        name_client: name,
        address_client: address
      });
      return response;
    }
  },
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Tipo Date nativo de js',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value); // ast value is always in string format
      }
      return null;
    }
  })
};

module.exports = resolverMap;
