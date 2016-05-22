var angular = require('angular');
require('angular-resource'); // $resource
require('angular-route'); // $route
require('angular-translate'); // $translate
require('angular-hotkeys'); // hotkeys
require('angular-formly'); // formly
require('angular-formly-templates-bootstrap'); // formlyBootsrap
//require('angular-multiple-select'); // Multi Select
require('ng-dropdown-multiselect');


var application = angular.module('application', [ 'angularjs-dropdown-multiselect','ngResource', 'ngRoute', 'pascalprecht.translate', 'cfp.hotkeys','formly', 'formlyBootstrap']);

require('./common/filters')(application);
require('./common/directives')(application);

application
  .provider('CommonConfig', require('./common/config'))

  .config(require('./route'))

  // .factory('$translateUrlLoader', require('./translation/service'))
  .factory('CommonRequest', require('./common/request'))
  .factory('CommonBrowser', require('./common/browser'))
  .factory('CommonMoment', require('./common/moment'))

  .factory('StorageUsers', require('./storage/users'))

  .provider('CommonUi', require('./ui/config'))
  .controller('UiCtrl', require('./ui/controller'))

  .controller('PageBaseCtrl', require('./page/base'))
  .controller('PageUsersCtrl', require('./page/users'))
  .controller('PageUsersLoginCtrl', require('./page/users'))
  .controller('ArticlesCtrl', require('./page/articles'))
  .controller('UsersListCtrl', require('./page/users'))
  .controller('UsersSingleListCtrl', require('./page/users'))
  .controller('UsersAddCtrl', require('./page/users'))

  ;

module.exports = application;
