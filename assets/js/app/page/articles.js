module.exports = [
    'CommonRequest', 'ngDialog', '$cacheFactory',
    function(
        CommonRequest, ngDialog, $cacheFactory
    ) {
        'use strict';
        var self = this;


        var simpleStorage = require('simpleStorage.js');

        //simpleStorage.set('1', 'hello');

        self.details = {};

        var newArticle = {
            name : '',
            price : '',
            img : '',
            allergics : [],
            group : '2'
        };

        // Allergene
        self.allergic_multipleSelect_Selected = [];
        self.allergic_multipleSelect_Data = [];

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

                    // Lösung für Error: [filter:notarray] Expected array but received: {"id":"WZ","label":"Weizen"}
                    self.allergic_multipleSelect_Data.push({id: self.list[i].shortName, label: self.list[i].longName});
                }
                console.log(self.allergic_multipleSelect_Data);
                // simpleStorage.set('Allergic', tempArr, {TTL: 100000});

            }
        }, function(response) {
            console.log('error', response);
        });

        CommonRequest.articles.getAll({}, {}, function(response) {
            if (response && response.message) {
                console.log(response.messages);
                self.list = response.message;
                console.log('articles.getAll wird ausgeführt');
            }
        });

        self.updateArticle = function() {
            CommonRequest.users.changeProfile({
                articleId : simpleStorage.get('secToken')
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
            CommonRequest.articles.addArticle({

            }, {
                'name': self.newArticle.name,
                'price': self.newArticle.price,
                'allergics': self.newArticle.allergics,
                'img': self.newArticle.img,
                'group': self.newArticle.group
            }, function(response) {
                console.log(response.message);
                console.log('error', response);
            });
        };
        
        self.getAll = function () {
            CommonRequest.articles.getAll({
                'x-access-token' : simpleStorage.get('secToken')

            },  {}, function(response) {
                if (response && response.message) {
                    self.list = response.message;
                    console.log('self.articles.getAll wird ausgeführt');
                }
            }, function(response) {
                console.log('error', response);
            });
        };
        self.goToAdd = function() {
            getAllAllergics();
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

        self.reload = function()
        {
            window.location.reload();
        }
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
                    // simpleStorage.set('Allergic', tempArr, {TTL: 100000});

                }
            }, function(response) {
                console.log('error', response);
            });
        };

        self.myEventListeners = {
            onItemSelect: onItemSelect
        };

        // MultiSelect Drop down select - Event
        function onItemSelect(property) {
            var temp = [];
            for(var i = 0; i < property.length; i++)
            {
                console.log(property.id);
                temp.push(property.id);
            }

            console.log(property);
            //self.newArticle.allergics.push(self.allergic_multipleSelect_Selected.id);
            console.log(temp);
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