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

        self.newArticle = {
            name : '',
            price : '',
            img : '',
            allergics : [],
            group : []
        };

        // Allergene
        self.allergic_multipleSelect_Selected = [];
        self.allergic_multipleSelect_Data = [];

        self.allergic_multipleSelect_Settings = {
            enableSearch: true,
            scrollable: false,
            smartButtonMaxItems: 3,
            smartButtonTextConverter: function(itemText, originalItem) {
                if (itemText === 'Jhon') {
                    return 'Jhonny!';
                }

                return itemText;
            }
        };

        // Allergene
        self.groups_multipleSelect_Selected = [];
        self.groups_multipleSelect_Data = [];

        self.groups_multipleSelect_Settings = {
            enableSearch: false,
            scrollable: false,
            smartButtonMaxItems: 1,
            selectionLimit: 1
        };

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
            var temp = [];
            for(var i = 0; i < self.allergic_multipleSelect_Selected.length; i++)
            {
                console.log("For: " , self.allergic_multipleSelect_Selected.id);
                temp.push(self.allergic_multipleSelect_Selected);
            }
            console.log("Temp: ", temp);

            CommonRequest.articles.addArticle({
                'x-access-token': simpleStorage.get('secToken')
            }, {
                'name': self.newArticle.name,
                'price': self.newArticle.price,
                'allergics': self.allergic_multipleSelect_Selected,
                'img': self.newArticle.img,
                'group': self.newArticle.group,
                'userid': simpleStorage.get('userID')
            }, function(response) {
                console.log(response.message);
                console.log('error', response);
            });
        };
        
        self.getAll = function () {
            CommonRequest.articles.getAll({
                

            },  {
                'x-access-token' : simpleStorage.get('secToken'),
                'userid' : simpleStorage.get('userID')
            }, function(response) {
                if (response && response.message) {
                    self.list = response.message;
                    console.log('self.articles.getAll wird ausgeführt');
                }})
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
         ####################### DropDown ##################################################
         ##################################################################################*/

        self.goToAdd = function() {
            CommonRequest.groups.getDropDown({
                'userID': simpleStorage.get('userID'),
                'x-access-token': simpleStorage.get('secToken')

            }, {}, function (response) {
                console.log("Response.message_1", response.message_1);
                console.log("Response.message_2", response.message_2);

                self.listGroup = response.message_1;
                self.listAllergic = response.message_2;

                console.log('self.groups.getDropDown wird ausgeführt und lokal gespeichert');
                for (var i = 0; i < self.listAllergic.length; i++) {
                    self.allergic_multipleSelect_Data.push({
                        id: self.listAllergic[i].shortName,
                        label: self.listAllergic[i].longName
                    });
                }

                for (var n = 0; n < self.listGroup.length; n++) {
                    self.groups_multipleSelect_Data.push({
                        id: self.listGroup[n].shortID,
                        label: self.listGroup[n].name
                    });
                }

                // simpleStorage.set('Allergic', tempArr, {TTL: 100000});
            }, function (response) {
                console.log('error', response);
            });
        };

        self.myEventListenersAllergics = {
            onItemSelect: onItemSelectAllergics
        };

        function onItemSelectAllergics(property) {

            console.log("ID: ", property.id);
        }


        self.myEventListenersGroups= {
            onItemSelect: onItemSelectGroups
        };
        function onItemSelectGroups(property) {
            self.newArticle.group = property.id;
        }
    }];
/*#######################################################################################*/

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