const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    login: Usuario
  }
  type Mutation {
    createQrCode(vcu: String!, width: Int): QrCode
  }

  scalar Date

  type Usuario {
    id: String
    nombre: String
    email: String
    role: String
    estado: Boolean
    google: Boolean
  }

  type ChargerCenter {
    name: String
    address: String
    latitude: Float
    longitude: Float
    swapsLow: Int
    swapsMedium: Int
    swapsFull: Int
    totalSwapsAvailable: Int
    scheduleMonFri: String
    scheduleSaturday: String
    scheduleSunday: String
  }

  type ServiceCenter {
    name: String
    address: String
    phoneNumber: String
    latitude: Float
    longitude: Float
    serviceTodayOpen: String
    serviceTodayClose: String
    scheduleMonFri: String
    scheduleSaturday: String
    scheduleSunday: String
  }

  type ZynchMoto {
    userId: String
    name: String
    swaps: Int
    serie: String
  }

  type ZynchPack {
    userId: String
    serie: String
    expired: Boolean
    namePack: String
    totalSwaps: Int
    swapsAvailable: Int
  }

  type QrCode {
    ok: Boolean
    err: String
    image: String
  }
`;

module.exports = typeDefs;
