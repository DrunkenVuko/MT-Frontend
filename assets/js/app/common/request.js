module.exports = ['$resource', '$http', 'CommonConfig', function($resource, $http, CommonConfig) {
  'use strict';

  var generateResource = function(route, endpoint, paramDefaults, actions, options) {
    if (actions) {
      angular.forEach(actions, function(action) {
        action.url = CommonConfig.endpoints[endpoint][CommonConfig.environment()] + action.url;
      });
    }

    return $resource((endpoint ? CommonConfig.endpoints[endpoint][CommonConfig.environment()] : '/') + route, paramDefaults, actions, options);
  };

  return {
    users : generateResource('users', 'backend', null, {
      // die standard operationen (get post put delete) werden automatisch erzeugt
      getUserById : {
        method : 'GET',
        url : 'users/:userId'
      },
      getTokenByLogin : {
        method : 'POST',
        url : 'users/authenticate/'
      }
    }),
    articles : generateResource('article', 'backend', null, {
      // die standard operationen (get post put delete) werden automatisch erzeugt
      getArticleById : {
        method : 'GET',
        url : 'article/:articleId'
      }
    })
    // articles : generateResource('articles', 'backend', null, {
    //   getUserById : {
    //     method : 'POST',
    //     url : 'articles/add/:articleId'
    //   }
    // })
  };
}];
