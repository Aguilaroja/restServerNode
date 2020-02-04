const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

const resolverMap = {
  CentersResult: {
    __resolveType(obj, context, info) {
      console.log('on __resolveType');
      console.log(obj);
      return null;
    }
  },
  Query: {
    chargeCenters: async (_, { location = null }, { dataSources }) => {
      console.log(location);
      const response = await dataSources.zynchApi.getChargerCenters(location);
      return response;
    },
    serviceCenters: async (_, { location = null }, { dataSources }) => {
      const response = await dataSources.zynchApi.getServiceCenters(location);
      return response;
    }
  },
  Mutation: {
    createQrCode: async (_, { vcu, width = 640 }, { dataSources }) => {
      const response = await dataSources.userAPI.createQrCode(vcu, width);
      return response;
    }
  },
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Tipo escalar personalizado',
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
