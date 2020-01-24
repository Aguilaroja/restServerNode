'use strict';
/* eslint-disable no-unused-expressions */

const express = require('express');
const expect = require('chai').expect;
const views = require('../src/routes/views');
const viewRoute = require('../src/routes/viewRoute');
const api = require('../src/routes/api');
const apiRoute = require('../src/routes/noodoeRoute');

const error = require('../src/routes/errorRoute');

var request = {};
var response = {
  viewName: '',
  data: {},
  render: function(view, viewData) {
    this.viewName = view;
    this.data = viewData;
  }
};

describe('Api Endpoints', function() {
  it('should get api router', () => {
    expect(Object.getPrototypeOf(api)).to.equal(express.Router);
  });
  it('api should contain some services', () => {
    expect(apiRoute).to.not.be.empty;
  });
});

describe('Views', function() {
  it('should get views router', () => {
    expect(Object.getPrototypeOf(views)).to.equal(express.Router);
  });
  it('views should not be empty', () => {
    expect(viewRoute).to.not.be.empty;
  });
  describe('Home Route', function() {
    it('should provide a title and the index view name', function() {
      viewRoute.index(request, response);
      expect(response.viewName).to.equal('index');
    });
  });
  describe('Recovery Route', function() {
    it('should provide a title and the recovery view name', function() {
      viewRoute.recovery(request, response);
      expect(response.viewName).to.equal('recovery');
    });
  });
});
