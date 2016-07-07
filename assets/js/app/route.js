module.exports = ['$routeProvider', '$locationProvider', '$httpProvider', 'CommonConfigProvider', 'CommonUiProvider', function($routeProvider, $locationProvider, $httpProvider, CommonConfig, CommonUi) {
  'use strict';

  var needsToBeLoggedIn = true;
  var independentPageResolver = function() {
    needsToBeLoggedIn = true;
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
    .when('/test', {
      controller : 'PageBaseCtrl as base',
      templateUrl : 'views/test.html',
      resolve: independentPageResolver,

    })
      .when('/users/authenticate', {
          controller : 'PageUsersLoginCtrl as users',
          templateUrl : 'views/login.html',
          resolve : independentPageResolver,
      })
      .when('/add/users/', {
          controller : 'UsersAddCtrl as users',
          templateUrl : 'views/user/addUser.html',
          resolve : independentPageResolver,
      })
      .when('/users/', {
          controller : 'UsersListCtrl as users',
          templateUrl : 'views/user/users.html',
          resolve : independentPageResolver,
      })
      .when('/users/:id', {
          controller : 'UsersSingleListCtrl as users',
          templateUrl : 'views/user/editUsers.html',
          resolve : independentPageResolver,
      })
      .when('/articles', {
          controller : 'ArticlesCtrl as articles',
          templateUrl : 'views/article/articles.html',
          resolve : independentPageResolver,
      })
      .when('/add/articles/', {
          controller : 'ArticlesCtrl as articles',
          templateUrl : 'views/article/addArticles.html',
          resolve : independentPageResolver,
      })
      .when('/articles/:id', {
          controller : 'ArticlesCtrl as articles',
          templateUrl : 'views/article/editArticles.html',
          resolve : independentPageResolver,
      })
    // .when('/register', {
    //     controller : 'PageRegisterCtrl as register',
    //     templateUrl : 'views/register.html',
    //     resolve : independentPageResolver,
    // })
    .otherwise({
      redirectTo : '/users/authenticate'
    });
}];
