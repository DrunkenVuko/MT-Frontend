/**
 * Created by Vuko on 19.07.16.
 */
module.exports = [
    'CommonRequest',
    function(
        CommonRequest
    ) {
        'use strict';
        var self = this;
        var simpleStorage = require('simpleStorage.js');
        self.amount = 1;
        self.qr = [];
        
        self.saveTableTempID = function(tempID)
        {
            simpleStorage.set('tempGroupID', tempID, {TTL: 100000});
            self.getTableViaID();
        }

        self.getID = function()
        {
            return simpleStorage.get('tempTableID')
        }
        
        self.getAll = function () {
            CommonRequest.tables.getAll({
            },  {            
                'id' : simpleStorage.get('userID'),
                'x-access-token' : simpleStorage.get('secToken')
            }, function(response) {
                simpleStorage.set('tempTableLength', response.message.length, {TTL: 10000});

                self.list = response.message;
                for (var i = 0; i < self.list.length; i++)
                {
                    self.qr.push("https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=" + self.list[i].url);
                }
                console.log(response.message );

                console.log('tables.getAll wird ausgeführt');
            });
        };
        

        self.getById = function () {
            CommonRequest.tables.getTablesById({
                'id' : simpleStorage.get('userID')

            },  {
                'x-access-token' : simpleStorage.get('secToken'),
                'tablenumber' : simpleStorage.get("tempTableID")
        }, function(response) {

                self.tempTable = response.message[0];
                console.log(response.message);
                self.tempURL = "https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=" + response.message[0].url;
                
                console.log(response.message );

                console.log('tables.getTablesById wird ausgeführt');
            });
        };


        self.getTablesID = function()
        {
            return simpleStorage.get('tempTableID');
        }
        self.saveTableTempID = function(tempID)
        {
            simpleStorage.set('tempTableID', tempID, {TTL: 100000});
            console.log("Gespeicherte Daten: ," , simpleStorage.get
            ("tempTableID"));
            self.getById();
        }



        self.add = function() {
            for(var i = simpleStorage.get('tempTableLength'); i < (simpleStorage.get('tempTableLength')+self.amount); i++)
            {
                CommonRequest.tables.addTables({
                    'x-access-token': simpleStorage.get('secToken')
                }, {
                    "tablenumber" : i+1,
                    'userid' : simpleStorage.get('userID')

                }, function(response) {
                    console.log('error', response);
                });
            }
        };
        
    }];
