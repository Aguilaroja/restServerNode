const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

const resolverMap = {
  Query: {},
  Mutation: {
    createQrCode: async (_, { vcu, width = 640 }, { dataSources }) => {
      console.log(`Resolver: vcu: ${vcu}, width: ${width}`);
      const serial = vcu;
      const w = width;
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
