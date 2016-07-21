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
      .when('/groups', {
          controller : 'GroupsCtrl as groups',
          templateUrl : 'views/group/groups.html',
          resolve : independentPageResolver,
      })
      .when('/add/groups/', {
          controller : 'GroupsCtrl as groups',
          templateUrl : 'views/group/addGroups.html',
          resolve : independentPageResolver,
      })
      .when('/groups/:id', {
          controller : 'GroupsCtrl as groups',
          templateUrl : 'views/group/editGroups.html',
          resolve : independentPageResolver,
      })
      .when('/allergics', {
      controller : 'AllergicCtrl as allergics',
      templateUrl : 'views/allergic/allergics.html',
      resolve : independentPageResolver,
  })
      .when('/add/allergics/', {
          controller : 'AllergicCtrl as allergics',
          templateUrl : 'views/allergic/addAllergics.html',
          resolve : independentPageResolver,
      })
      .when('/allergics/:id', {
      controller : 'AllergicCtrl as allergics',
      templateUrl : 'views/allergic/editAllergics.html',
      resolve : independentPageResolver,
  })
      .when('/tables', {
          controller : 'TableCtrl as tables',
          templateUrl : 'views/table/tables.html',
          resolve : independentPageResolver,
      })
      .when('/add/tables', {
          controller : 'TableCtrl as tables',
          templateUrl : 'views/table/addTables.html',
          resolve : independentPageResolver,
      })
      .when('/print/tables/:id', {
          controller : 'TableCtrl as tables',
          templateUrl : 'views/table/printTables.html',
          resolve : independentPageResolver,
      })
      .when('/m/orders/', {
          controller : 'OrderCtrl as order',
          templateUrl : 'views/mobile/orders.html',
          resolve : independentPageResolver,
      })
      .when('/m/orders/:id', {
      controller : 'OrderCtrl as order',
      templateUrl : 'views/mobile/ordersList.html',
      resolve : independentPageResolver,
  })
      .when('/m/orders/d/:id', {
          controller : 'OrderCtrl as order',
          templateUrl : 'views/mobile/orderDetail.html',
          resolve : independentPageResolver,
      })
      .when('/m/home/:id', {
          controller : 'OrderCtrl as order',
          templateUrl : 'views/mobile/home.html',
          resolve : independentPageResolver,
      })
      .when('/m/invoice', {
          controller : 'OrderCtrl as order',
          templateUrl : 'views/mobile/invoice.html',
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
