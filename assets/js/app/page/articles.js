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

        self.tempAllergics = [];


        self.newArticle = {
            name : '',
            price : '',
            img : '',
            allergics : [],
            group : [],
            desc : ''
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
            smartButtonMaxItems: 3
            //selectionLimit: 3
        };

        self.updateArticle = function() {
            // Pushe nur die _id hoch
            var temp = [];
            for(var i = 0; i < self.allergic_multipleSelect_Selected.length; i++)
            {
                temp.push(self.allergic_multipleSelect_Selected);
            }

            var temp2 = [];
            for(var i = 0; i < self.groups_multipleSelect_Selected.length; i++)
            {
                temp2.push(self.groups_multipleSelect_Selected);
            }
            console.log("Temp2: ", temp2);
            // Ende vom _id Push
            
            self.newArticle.price = self.newArticle.price.replace(/,/g, '.');

            CommonRequest.articles.changeArticle({
                id : simpleStorage.get('tempArticleID')
            },  {
                'x-access-token': simpleStorage.get('secToken'),
                'name': self.newArticle.name,
                'price': self.newArticle.price,
                'allergics': self.allergic_multipleSelect_Selected,
                'img': self.newArticle.img,
                'group': self.groups_multipleSelect_Selected,
                'desc': self.newArticle.desc,
                'userid': simpleStorage.get('userID')
            }, function(response) {
                console.log('error', response);
            });
        };
        
        self.add = function() {
            // Pushe nur die _id hoch
            var temp = [];
            for(var i = 0; i < self.allergic_multipleSelect_Selected.length; i++)
            {
                temp.push(self.allergic_multipleSelect_Selected);
            }

            var temp2 = [];
            for(var i = 0; i < self.groups_multipleSelect_Selected.length; i++)
            {
                temp2.push(self.groups_multipleSelect_Selected);
            }
            console.log("Temp2: ", temp2);
            // Ende vom _id Push

            self.newArticle.price = self.newArticle.price.replace(/,/g, '.');

            CommonRequest.articles.addArticle({
                'x-access-token': simpleStorage.get('secToken')
            }, {
                'name': self.newArticle.name,
                'price': self.newArticle.price,
                'allergics': self.allergic_multipleSelect_Selected,
                'img': self.newArticle.img,
                'group': self.groups_multipleSelect_Selected,
                'userid': simpleStorage.get('userID'),
                'desc' : self.newArticle.desc
            }, function(response) {
                console.log(response.message);
                console.log('error', response);
            });
        };
        
        self.getAll = function () {
            CommonRequest.articles.getAll({},  {
                'x-access-token' : simpleStorage.get('secToken'),
                'userid' : simpleStorage.get('userID')
            }, function(response) {

                self.list = response.message;
                console.log('self.articles.getAll wird ausgeführt');
                })
        };

        self.getById = function () {
            CommonRequest.articles.getArticleById({
                'x-access-token' : simpleStorage.get('secToken'), articleId : simpleStorage.get('tempArticleID')

            },  {}, function(response) {

                self.newArticle = response.message;
                

                // Umwandlung für Dropdown, somit werden die bereits ausgewählten Sachen angezeigt
                for (var i = 0; i < response.message.allergics.length; i++) {
                    self.allergic_multipleSelect_Selected.push({
                        id: response.message.allergics[i]._id,
                        label: response.message.allergics[i].longName
                    });
                }
                for (var i = 0; i < response.message.group.length; i++) {
                    self.groups_multipleSelect_Selected.push({
                        id: response.message.group[i]._id,
                        label: response.message.group[i].name
                    });
                }
                console.log(self.allergic_multipleSelect_Selected);

                console.log('article.getArticleById wird ausgeführt');

            }, function(response) {
                console.log('error', response);
            });
        };

        self.reload = function()
        {
            window.location.reload();
        }
        
        self.getArticleID = function()
        {
            return simpleStorage.get('tempArticleID');
        }
        self.saveArticleTempID = function(tempID)
        {
            simpleStorage.set('tempArticleID', tempID, {TTL: 100000});
            self.getById();
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
                        id: self.listAllergic[i]._id,
                        label: self.listAllergic[i].longName
                    });
                }

                for (var n = 0; n < self.listGroup.length; n++) {
                    self.groups_multipleSelect_Data.push({
                        id: self.listGroup[n]._id,
                        label: self.listGroup[n].name,
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
            console.log("ID: ", property.id);
        }


        self.checkToken = function()
        {
            if(simpleStorage.get('secToken') == null) {
                document.location.href = ('/#/users/authenticate');
                console.log("Umleitung zu Login");
            }
        }
        
        self.checkTokenArticle = function()
        {
            if(simpleStorage.get('tempArticleID') == null)
            {
                document.location.href = ('/#/articles');
                console.log("Umleitung zu Artikel");
            }
        }

    }];
/*#######################################################################################*/

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