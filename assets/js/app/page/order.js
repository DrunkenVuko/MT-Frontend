module.exports = [
    'CommonRequest',
    function(
        CommonRequest
    ) {
        'use strict';
        var self = this;
        var simpleStorage = require('simpleStorage.js');

        self.customers = [
        {
            'id' : '1',
            'name' : '1'
        },
        {
            'id' : '2',
            'name' : '2'
        },
        {
            'id' : '3',
            'name' : '3'
        },
    ]


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

        self.test = function(id){
            console.log("ID:", id);
        }
}];
