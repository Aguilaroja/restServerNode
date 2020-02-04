const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    login: Usuario
    serviceCenters(location: LocationInput): [ServiceCenter]
    chargeCenters(location: LocationInput): [ChargerCenter]
    centers(type: CenterEnum, location: LocationInput): [CentersResult]
  }
  type Mutation {
    createQrCode(vcu: String!, width: Int): QrCode
  }

  input LocationInput {
    latitude: Float
    longitude: Float
  }

  type Location {
    latitude: Float
    longitude: Float
  }
  scalar Date

  type Usuario {
    id: String
    nombre: String
    email: String
    role: String
    estado: Boolean
    google: Boolean
    error: Error
  }

  type CenterInfo {
    name: String
    address: String
    phoneNumber: String
    location: Location
    scheduleMonFri: String
    scheduleSaturday: String
    scheduleSunday: String
  }

  type ChargerCenter {
    name: String
    address: String
    phoneNumber: String
    location: Location
    distance: Float
    scheduleMonFri: String
    scheduleSaturday: String
    scheduleSunday: String
    openToday: String
    closeToday: String
    swapsLow: Int
    swapsMedium: Int
    swapsFull: Int
    totalSwapsAvailable: Int
    error: Error
  }

  type ServiceCenter {
    name: String
    address: String
    phoneNumber: String
    location: Location
    distance: Float
    scheduleMonFri: String
    scheduleSaturday: String
    scheduleSunday: String
    openToday: String
    closeToday: String
    error: Error
  }

  union CentersResult = ChargerCenter | ServiceCenter

  enum CenterEnum {
    CHARGING_CENTERS
    SERVICE_CENTERS
  }

  type ZynchMoto {
    userId: String
    name: String
    swaps: Int
    serie: String
    error: Error
  }

  type ZynchPack {
    userId: String
    serie: String
    expired: Boolean
    namePack: String
    totalSwaps: Int
    swapsAvailable: Int
    error: Error
  }

  type QrCode {
    ok: Boolean
    error: Error
    image: String
  }

  type Error {
    code: String
    message: String
  }
`;

module.exports = typeDefs;
