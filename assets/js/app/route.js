module.exports = ['$routeProvider', '$locationProvider', '$httpProvider', 'CommonConfigProvider', 'CommonUiProvider', function($routeProvider, $locationProvider, $httpProvider, CommonConfig, CommonUi) {
  'use strict';

  var needsToBeLoggedIn = false;
  var independentPageResolver = function() {
    needsToBeLoggedIn = false;
  };

  $httpProvider.defaults.withCredentials = false;
  $httpProvider.interceptors.push(['$q', '$location', '$translate', function($q, $location, $translate) {
    return {
      request : function(config) {
        CommonUi.busy = true;
        return config;
      },
      requestError : function(rejection) {
        return $q.reject(rejection);
      },
      response : function(response) {
        CommonUi.busy = false;
        return response;
      }
    };
  }]);

  $locationProvider.html5Mode(true);

  $routeProvider
    .when('/', {
      controller : 'PageBaseCtrl as base',
      templateUrl : 'views/landingpage.html',
      resolve: independentPageResolver,

    })
      .when('/users', {
          controller : 'PageUsersCtrl as users',
          templateUrl : 'views/users.html',
          resolve : independentPageResolver,
      })
      .when('/articles', {
          controller : 'ArticlesCtrl as articles',
          templateUrl : 'views/articles.html',
          resolve : independentPageResolver,
      })
    // .when('/register', {
    //     controller : 'PageRegisterCtrl as register',
    //     templateUrl : 'views/register.html',
    //     resolve : independentPageResolver,
    // })
    .otherwise({
      redirectTo : '/'
    });
}];
