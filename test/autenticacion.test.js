'use strict';

const expect = require('chai').expect;
const {
  verificaTokenDB,
  verificaTokenJWT,
  verificaAdminRole,
  verificaCliente
} = require('../src/server/middlewares/autenticacion');

describe('Middlewares de Verificación', () => {
  it('should get verificaTokenDB function', () => {
    expect(verificaTokenDB).to.be.an('function');
  });
  it('should get verificaTokenJWT function', () => {
    expect(verificaTokenJWT).to.be.an('function');
  });
  it('should get verificaAdminRole function', () => {
    expect(verificaAdminRole).to.be.an('function');
  });
  it('should get verificaCliente function', () => {
    expect(verificaCliente).to.be.an('function');
  });
});
