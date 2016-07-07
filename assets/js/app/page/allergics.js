module.exports = [
    'CommonRequest',
    function(
        CommonRequest
    ) {
        'use strict';
        var self = this;
        self.details = {};
        var simpleStorage = require('simpleStorage.js');


            
        self.newAllergic = {
            longName : '',
            shortName : '',
        };


        self.updateAllergic = function() {
            CommonRequest.allergics.changeAllergic({
            },  {
                'x-access-token': simpleStorage.get('secToken'),
                'longName' : self.tempAllergics.longName,
                'shortName' : self.tempAllergics.shortName,
                'userid' : simpleStorage.get('userID'),
                'id' : simpleStorage.get('tempAllergicID')
            }, function(response) {
                console.log('error', response);
            });
        };

        self.add = function() {
            CommonRequest.allergics.addAllergic({
                'x-access-token': simpleStorage.get('secToken')
            }, {
                'longName' : self.newAllergic.longName,
                'shortName' : self.newAllergic.shortName,
                'userid': simpleStorage.get('userID')
            }, function(response) {
                console.log('error', response);
            });
        };

        self.getAll = function () {
            CommonRequest.allergics.getAll({
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

        self.goToAdd = function() {
            //document.location.href = ('/add/allergics/');
        };

        self.getById = function () {
            CommonRequest.allergics.getAllergicById({
                'x-access-token' : simpleStorage.get('secToken'),
                'userid' : simpleStorage.get('userID'),
                'id' : simpleStorage.get('tempAllergicID')

            },  {}, function(response) {
                self.tempAllergics = response.message;
                console.log('self.getById wird ausgeführt');
                console.log(response.message);
            }, function(response) {
                console.log('error', response);
            });
        };

        self.saveAllergicTempID = function(tempID)
        {
            simpleStorage.set('tempAllergicID', tempID, {TTL: 100000});
            self.getById();
        }
        
        self.checkToken = function()
        {
            if(simpleStorage.get('secToken') == null)
            {
                document.location.href = ('/allergics/authenticate');
                console.log("Done");
            }
        }
    }];



