module.exports = ['$translateProvider', function ($translateProvider) {
  'use strict';

  var self = this,
    environment = require('../environment');

  self.$get = function() {
    return self;
  };

  self.environment = function() {
    return environment;
  };

  self.endpoints = {
    backend : {
      //development: 'http://localhost:3000/'
      development: 'http://52.58.36.132:3000/'
    }
  };
}];
