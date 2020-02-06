const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    login: User
    serviceCenters(location: LocationInput): [ServiceCenter]
    chargeCenters(location: LocationInput): [ChargerCenter]
  }
  type Mutation {
    createQrCode(vcu: String!, width: Int): QrCode

    createUser(nombre: String!, email: String!, password: String!, role: UserRole): User

    createChargerCenter(
      name: String!
      address: String!
      location: LocationInput!
      phoneNumber: String!
      scheduleMonFri: String!
      scheduleSaturday: String!
      scheduleSunday: String!
      swapsLow: Int!
      swapsMedium: Int!
      swapsFull: Int!
      totalSwapsAvailable: Int!
    ): ChargerCenter

    createServiceCenter(
      name: String!
      address: String!
      location: LocationInput!
      phoneNumber: String!
      scheduleMonFri: String!
      scheduleSaturday: String!
      scheduleSunday: String!
    ): ServiceCenter

    createScooter(name: String!, userId: String!, vcu: String!): ZynchScooter

    createZynchPack(
      name: String!
      userId: String!
      vcu: String!
      totalSwaps: Int!
      swapsAvailable: Int!
      price: Float!
    ): ZynchPack

    createClient(name: String!, address: String!): Client
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

  type User {
    id: String
    nombre: String
    email: String
    role: String
    estado: Boolean
    google: Boolean
    error: Error
  }
  enum UserRole {
    ADMIN_ROLE
    USER_ROLE
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

  type ZynchScooter {
    predetermined: Boolean
    locked: Boolean
    status: String
    img: String
    userId: String
    name: String
    swaps: Int
    vcu: String
  }

  type ZynchPack {
    userEmail: String
    userId: String
    vcu: String
    expired: Boolean
    namePack: String
    totalSwaps: Int
    swapsAvailable: Int
    validUntil: Date
  }

  type Client {
    name: String
    address: String
    id: String
    key: String
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
