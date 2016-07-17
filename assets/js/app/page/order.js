module.exports = [
    'CommonRequest',
    function(
        CommonRequest
    ) {
        'use strict';
        var self = this;
        var simpleStorage = require('simpleStorage.js');
        var colorControl = false;

          self.amount = 1;



        self.getAll = function () {
        CommonRequest.groups.getAll({
            'x-access-token' : simpleStorage.get('secToken')

        },  {}, function(response) {
            if (response && response.message) {
                self.list = response.message;
                console.log('self.getAll wird ausgeführt');
            }
        }, function(response) {
            console.log('error', response);
        });
    };

        self.getArticles = function () {
            CommonRequest.mobile.getArticlesViaGroup({
                'id': simpleStorage.get('tempGroupID')
            },  {
                'x-access-token' : simpleStorage.get('secToken'),
                'userid' : '57699490e8be70ec09ab94d6'
            }, function(response) {
                if (response && response.message) {

                self.list = response.message;

                    //self.listID = response.message.id;
                    console.log('self.getArticlesViaGroup wird ausgeführt');
                }
            }, function(response) {
                console.log('error', response);
            });
        };
        

        self.saveGroupTempID = function(tempID, tempName)
        {
            simpleStorage.set('tempGroupName', tempName, {TTL: 100000});
            simpleStorage.set('tempGroupID', tempID, {TTL: 100000});
            self.getArticles();
        }

        self.getID = function()
        {
            return simpleStorage.get('tempGroupID')
        }
        
        self.getName = function()
        {
            return simpleStorage.get('tempGroupName')
        }

        self.getById = function () {
            CommonRequest.mobile.getArticleViaId({
                'id' : simpleStorage.get('tempArticleID')

            },  {
                'x-access-token' : simpleStorage.get('secToken'),
                'userid' : '57699490e8be70ec09ab94d6'

            }, function(response) {

                self.allergics = "";
                for (var i = 0; i < response.message[0].data.allergics.length; i++)
                {
                    self.allergics += response.message[0].data.allergics[i].label;
                    if(i < response.message[0].data.allergics.length-1)
                    {
                        self.allergics += ", ";
                    }
                }

                self.newArticle = response.message[0];
                console.log(response.message );
                self.manipulatedPrice = convertNumber(self.newArticle.data.price);

                console.log('article.getArticleById wird ausgeführt');
            });
        };

        
        self.getArticleID = function()
        {
            return simpleStorage.get('tempArticleID');
        }
        self.saveArticleTempID = function(tempID)
        {
            simpleStorage.set('tempArticleID', tempID, {TTL: 100000});
            console.log("Gespeicherte Daten: ," , simpleStorage.get
            ("tempArticleID"));
            self.getById();
        }



        self.add = function() {
            CommonRequest.mobile.addTable({
                'x-access-token': simpleStorage.get('secToken')
            }, {
                'tablenumber' : '1',
                'articleid' : self.newArticle.data._id,
                'amount' : self.amount,
                'price' : self.newArticle.data.price,
                'userid' : self.newArticle.data.usrID,
                'name' : self.newArticle.data.name

            }, function(response) {
                console.log('error', response);
            });
        };


        self.test = function(id){
            console.log("ID:", id);
        }

        self.up= function(){
            self.amount = self.amount + 1.00;
            self.manipulatedPrice = (self.amount * convertNumber(self.newArticle.data.price)).toFixed(2);
        }

        self.down= function(){
            self.amount = self.amount - 1.00;
            self.manipulatedPrice = (self.amount * convertNumber(self.newArticle.data.price)).toFixed(2);

        }

        function convertNumber(number)
        {
            return parseFloat(Math.round(number * 100) / 100).toFixed(2);
        }

        self.getInvoiceByID = function () {
            CommonRequest.mobile.getTableViaId({
                'id' : '57699490e8be70ec09ab94d6'

            },  {
                'x-access-token' : simpleStorage.get('secToken'),
                'table' : '1'

            }, function(response) {

                self.invoice = response.message;
                self.price = convertNumber(response.price);
                console.log(response.message );

                console.log('order.getInvoiceById wird ausgeführt');
            });
        };
}];
