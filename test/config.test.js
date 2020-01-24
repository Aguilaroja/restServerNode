'use strict';

const expect = require('chai').expect;
const { config, database, express, log, stats } = require('../src/server/config/index');

describe('Config', () => {
  it('should get config object', () => {
    expect(config).to.be.an('object');
  });
  it('should get database object', () => {
    expect(database).to.be.an('object');
  });
  it('should get log object', () => {
    expect(log).to.be.an('object');
  });
  it('should get stats object', () => {
    expect(stats).to.be.an('object');
  });
  it('should get express object', () => {
    expect(express).to.be.an('object');
  });
});
