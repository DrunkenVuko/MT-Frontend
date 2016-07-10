module.exports = [
    'CommonRequest',
    function(
        CommonRequest
    ) {
        'use strict';
        var self = this;
        self.details = {};
        var simpleStorage = require('simpleStorage.js');



        self.newGroup = {
            shortID : '',
            desc : '',
            name : '',
            img : ''
        };


        self.updateGroup = function() {
            CommonRequest.groups.changeGroups({
                'id' : simpleStorage.get('tempGroupID')
            },  {
                'x-access-token': simpleStorage.get('secToken'),
                'img' : self.tempGroups.img,
                'shortID' : self.tempGroups.shortID,
                'desc' : self.tempGroups.desc,
                'name' : self.tempGroups.name,
                'userid' : simpleStorage.get('userid')

            }, function(response) {
                console.log('error', response);
            });
        };

        self.add = function() {
            CommonRequest.groups.addGroups({
                'x-access-token': simpleStorage.get('secToken')
            }, {
                'img' : self.newGroups.img,
                'shortID' : self.newGroups.shortID,
                'desc' : self.newGroups.desc,
                'name' : self.newGroups.name,
                'userid' : simpleStorage.get('userid')
            }, function(response) {
                console.log('error', response);
            });
        };

        self.waypointAdd = function()
        {
            self.add();
            self.reloadPage();
        }

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


        self.getById = function () {
            CommonRequest.groups.getGroupsById({
                'id' : simpleStorage.get('tempGroupID'),
                    'x-access-token' : simpleStorage.get('secToken'),
            },
            {

                'userid' : simpleStorage.get('userid')

            }, function(response) {
                self.tempGroups = response.message;
                console.log('self.getById wird ausgeführt');
                console.log(response.message);
            }, function(response) {
                console.log('error', response);
            });
        };

        self.saveGroupTempID = function(tempID)
        {
            simpleStorage.set('tempGroupID', tempID, {TTL: 100000});
            self.getById();
        }

        self.checkToken = function()
        {
            if(simpleStorage.get('secToken') == null)
            {
                document.location.href = ('/users/authenticate');
                console.log("Done");
            }
        }

        self.reloadPage = function()
        {
            window.location.reload();
        }
    }];



