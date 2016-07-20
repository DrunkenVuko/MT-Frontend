module.exports = ['$resource', '$http', 'CommonConfig', function($resource, $http, CommonConfig) {
  'use strict';

  var generateResource = function(route, endpoint, paramDefaults, actions, options) {
    if (actions) {
      angular.forEach(actions, function(action) {
        action.url = CommonConfig.endpoints[endpoint][CommonConfig.environment()] + action.url;
      });
    }

    return $resource((endpoint ? CommonConfig.endpoints[endpoint][CommonConfig.environment()] : '/')  + route, paramDefaults, actions, options);
  };

  return {
    users : generateResource('users', 'backend', null, {
      // die standard operationen (get post put delete) werden automatisch erzeugt
      getTokenByLogin : {
        method : 'POST',
        url : 'users/authenticate/'
      },
      getAll : {
        method : 'GET',
        url : 'users/',
        cache: true
      },
      getUserById : {
        method : 'GET',
        url : 'users/:userId'
      },
      addUser : {
        method : 'POST',
        url : 'users/register/'
      },
      changeProfile : {
        method : 'PUT',
        url : 'users/:userId'
      },
    }),
    articles : generateResource('article', 'backend', null, {
      // die standard operationen (get post put delete) werden automatisch erzeugt
      getArticleById : {
        method : 'GET',
        url : 'article/:articleId'
      },
      getAll : {
        method : 'POST',
        url : 'article/',
        cache: true
      },
      addArticle : {
        method : 'POST',
        url : 'article/add/'
      },
      changeArticle : {
        method: 'PUT',
        url: 'article/:id'
      }
    }),
    allergics : generateResource('allergic', 'backend', null, {
      // die standard operationen (get post put delete) werden automatisch erzeugt
      getAllergicById : {
        method : 'GET',
        url : 'allergics/:id'
      },
      getAll : {
        method : 'GET',
        url : 'allergics/',
        cache: true
      },
      addAllergic : {
        method : 'POST',
        url : 'allergics/add/'
      },
      changeAllergic : {
        method: 'PUT',
        url: 'allergics/:id'
      }
    }),
    groups : generateResource('groups', 'backend', null, {
      // die standard operationen (get post put delete) werden automatisch erzeugt
      getGroupsById : {
        method : 'GET',
        url : 'groups/:id'
      },
      getAll : {
        method : 'GET',
        url : 'groups/',
        cache: true
      },
      addGroups : {
        method : 'POST',
        url : 'groups/add/'
      },
      changeGroups : {
        method: 'PUT',
        url: 'groups/:id'
      },
      getDropDown : {
        method: 'GET',
        url: 'groups/dropDown/:userID'
      }
    }),
    tables : generateResource('tables', 'backend', null, {
      // die standard operationen (get post put delete) werden automatisch erzeugt
      getAll : {
        method : 'POST',
        url : 'tables/'
      },      
      getTablesById : {
        method : 'POST',
        url : 'tables/:id'
      },
      addTables : {
        method : 'POST',
        url : 'tables/add/'
      },
      changeTables : {
        method: 'PUT',
        url: 'tables/:id'
      }
    }),
    mobile : generateResource('mobile', 'backend', null, {
      // Mobile Web-App
      getArticlesViaGroup : {
        method: 'POST',
        url: 'mobile/menu/:id'
      },
      getArticleViaId : {
        method: 'POST',
        url : 'mobile/menu/d/:id'
      },
      addTable : {
        method: 'POST',
        url : 'mobile/menu/add'
      },
      // Invoice
      getTableViaId : {
        method: 'POST',
        url : 'mobile/table/:id'
      },
    })
    // articles : generateResource('articles', 'backend', null, {
    //   getUserById : {
    //     method : 'POST',
    //     url : 'articles/add/:articleId'
    //   }
    // })
  };
}];
