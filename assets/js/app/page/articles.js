module.exports = [
    'CommonRequest', 'ngDialog', '$cacheFactory',
    function(
        CommonRequest, ngDialog, $cacheFactory
    ) {
        'use strict';
        var self = this;
        var simpleStorage = require('simpleStorage.js');
        self.details = {};

        //self.username = localStorage.getItem('username');

        self.save = function(){
            var username = self.test1.val();
            localStorage.setItem('username', username);
        };

 /*       // Cache ****************************************
        self.keys= [];
        //self.cache = $cacheFactory('tempCache');

        self.addItem = function(itemKey, itemValue){
            self.keys.push(itemKey);
            self.cache.put(itemKey, itemValue);
            console.log(self.keys);
        };

        self.getItem = function(itemKey){
            self.currentItem = self.cache.get(itemKey);
            var httpCache = $cacheFactory.get('$http');

            var cachedResponse = httpCache.get('article/');
            console.log("****************************************");
        };

        self.removeItem = function(itemKey){
            self.keys = self.keys.filter(function(key){
                return(key !== itemKey);
            });
            self.cache.remove(itemKey);
        };*/


        // Allergene
        self.allergic_multipleSelect_Selected = [];
        self.allergic_multipleSelect_Data = simpleStorage.get('Allergic');

        self.allergic_multipleSelect_Settings = {
            enableSearch: true,
            scrollable: true,
            smartButtonMaxItems: 3,
            smartButtonTextConverter: function(itemText, originalItem) {
                if (itemText === 'Jhon') {
                    return 'Jhonny!';
                }

                return itemText;
            }
        };




        // // Gruppierungen
        // self.group_multipleSelect_Selected = [];
        // self.group_multipleSelect_Data = [
        //     {id: 1, label: 'Vorspeise'},
        //     {id: 2, label: 'Hauptspeise'},
        //     {id: 3, label: 'Dessert'},
        //     {id: 4, label: 'Spirituosen'},
        //     {id: 5, label: 'etc'}];
        //
        // self.group_multipleSelect_Settings = {
        //     enableSearch: true,
        //     scrollable: true,
        //     smartButtonMaxItems: 2,
        //     smartButtonTextConverter: function(itemText, originalItem) {
        //         if (itemText === 'Jhon') {
        //             return 'Jhonny!';
        //         }
        //
        //         return itemText;
        //     }
        // };

        // CommonRequest.articles.getAll({'x-access-token' : simpleStorage.get('secToken')}, {}, function(response) {
        //     if (response && response.message) {
        //         self.list = response.message;
        //         console.log('articles.getAll wird ausgeführt');
        //     }
        // });
        CommonRequest.articles.getAll({}, {}, function(response) {
            if (response && response.message) {
                console.log(response.messages);
                self.list = response.message;
                console.log('articles.getAll wird ausgeführt');
                // preLoad
                getAllAllergics();
            }
        });
        // CommonRequest.articles.getArticleById({'x-access-token' : simpleStorage.get('secToken'), articleId : getCookie('tempArticleID')}, {}, function(response) {
        //     if (response && response.message) {
        //         console.log('article.getArticleById wird ausgeführt');
        //         self.tempArticle = response.message;
        //     }
        // });
        self.updateArticle = function() {
            CommonRequest.users.changeProfile({
                articleId : getCookie('tempArticleID')
            },  {
                'x-access-token': simpleStorage.get('secToken'),
                'name': self.tempArticle.name,
                'price': self.tempArticle.price,
                'allergics': self.tempArticle.allergics,
                'img': self.tempArticle.img,
                'group': self.tempArticle.group
            }, function(response) {
                console.log('error', response);
            });
        };
        self.add = function() {
            CommonRequest.users.addArticle({

            }, {
                'name': self.newArticle.name,
                'price': self.newArticle.price,
                'allergics': self.newArticle.allergics,
                'img': self.newArticle.img,
                'group': self.newArticle.group
            }, function(response) {
                console.log('error', response);
            });
        };
        self.getAll = function () {
            CommonRequest.articles.getAll({
                'x-access-token' : simpleStorage.get('secToken')

            },  {}, function(response) {
                if (response && response.message) {
                    // preLoad
                    getAllAllergics();
                    console.log(self.list);

                    self.list = response.message;
                    console.log('self.articles.getAll wird ausgeführt');
                }
            }, function(response) {
                console.log('error', response);
            });
        };
        self.goToAdd = function() {
            document.location.href = ('/articles/add');
        };

        self.getById = function (articleID) {
            CommonRequest.articles.getArticleById({
                'x-access-token' : simpleStorage.get('secToken'), articleId : articleID

            },  {}, function(response) {
                self.tempArticle = response.message;
                console.log('article.getArticleById wird ausgeführt');
                document.cookie = 'tempArticleID=' + response.message._id;
                document.location.href = ('/articles/' + response.message._id);
            }, function(response) {
                console.log('error', response);
            });
        };
        self.openAdd = function clickToOpen() {
            getAllAllergics();
            ngDialog.open({
                template: 'views/article/addArticles.html',
                //controller: 'ArticlesCtrl',
                //controllerAs: 'AllergicsValueCtrl'
                data: {
                    allergicData: simpleStorage.get('Allergic'),
                    allergicDataSelected: '',
                    allergicSettings: {
                        enableSearch: true,
                        scrollable: true,
                        smartButtonMaxItems: 3,
                        smartButtonTextConverter: function(itemText, originalItem) {
                            if (itemText === 'Jhon') {
                                return 'Jhonny!';
                            }

                            return itemText;
                        }
                    }
                }
            });
        };
/*##################################################################################
####################### Allergics ##################################################
##################################################################################*/
        //{_id: "5744761e555738a40e2bf399", longName: "Roggen", shortName: "RG", __v: 0, $$hashKey: "object:49"}

        function getAllAllergics() {
            CommonRequest.allergics.getAll({
                'x-access-token' : simpleStorage.get('secToken')

            },  {}, function(response) {
                if (response && response.message) {
                    self.list = response.message;
                    console.log('self.allergics.getAll wird ausgeführt und lokal gespeichert');
                    // Get all names from Server and save it local via 'Allergic'
                    var tempArr = [];
                    for(var i = 0; i < self.list.length; i++)
                    {
                        var temp = {id : self.list[i].shortName, label: self.list[i].longName};
                        tempArr[i] = temp;
                        temp = '';
                        self.allergic_multipleSelect_Data =  {id: self.list[i].shortName, label: self.list[i].longName}

                    }
                    simpleStorage.set('Allergic', tempArr, {TTL: 100000});

                }
            }, function(response) {
                console.log('error', response);
            });
        };


        self.reload = function()
        {
            window.location.reload();
        }

        function getAllergics() {
            return self.allergic_multipleSelect_Data;
        }
    }];

function getCookie(cname) {
    var name = cname + '=';
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)===' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length,c.length);
        }
    }
    return '';
}
function delCookie(cname) {
    document.cookie = cname + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
