module.exports = [
  'CommonRequest',
  function(
      CommonRequest
  ) {
    'use strict';
    var self = this;
    self.details = {};
    var simpleStorage = require('simpleStorage.js');

    var newUser = {
      username : '',
      firstname : '',
      lastname : '',
      email : '',
      company : '',
      street : '',
      streetnumber : '',
      zip : '',
      city : '',
      password : ''
    };


    self.updateProfile = function() {
      CommonRequest.users.changeProfile({
        userId : simpleStorage.get('userID')
      },  {
        'x-access-token': simpleStorage.get('secToken'),
        'username' : self.tempUser.username,
        'firstname' : self.tempUser.firstname,
        'lastname' : self.tempUser.lastname,
        'email' : self.tempUser.email,
        'company' : self.tempUser.company,
        'zip' : self.tempUser.zip,
        'city' : self.tempUser.city,
        'street' : self.tempUser.street,
        'streetnumber' : self.tempUser.streetnumber,
        'Role': 'User'
      }, function(response) {
        console.log('error', response);
      });
    };

    self.add = function() {
      CommonRequest.users.addUser({

      }, {
        'username': self.newUser.username,
        'firstname': self.newUser.firstname,
        'lastname': self.newUser.lastname,
        'email': self.newUser.email,
        'company': self.newUser.company,
        'zip': self.newUser.zip,
        'city': self.newUser.city,
        'street': self.newUser.street,
        'streetnumber': self.newUser.streetnumber,
        'password': self.newUser.password
      }, function(response) {
        console.log('error', response);
      });
    };

    self.login = function() {
      CommonRequest.users.getTokenByLogin({}, {
        user: self.goran, password: self.goran2
      }, function (response) {
        if (response && response.message) {
          console.log(response.userID);
          simpleStorage.set('userID', response.userID, {TTL: 10000000});
          simpleStorage.set('secToken', response.token); // 2,7Std / Sekunden

          //document.cookie = 'token=' + response.token;
          console.log('Der Sicherheitstoken', simpleStorage.get('secToken'));
          console.log('Die UserID', simpleStorage.get('userID'));

        }
      });
    };

    self.getAll = function () {
      CommonRequest.users.getAll({
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
      document.location.href = ('/#/add/users/');
    };
    
    self.waypointAdd = function()
    {
      self.updateProfile();
      self.reloadPage();
    }
    
    self.reloadPage = function()
    {
      window.location.reload();
    }

    self.getUserID = function()
    {
      return simpleStorage.get('tempUserID');
    }
    self.saveUserTempID = function(tempID)
    {
      simpleStorage.set('tempUserID', tempID, {TTL: 100000});
      self.getById();
    }
    
    self.getById = function () {
      CommonRequest.users.getUserById({
        'userId' : self.getUserID(),
        'x-access-token' : simpleStorage.get('secToken')

      },  {

      }, function(response) {
        self.tempUser = response.message;
        console.log('self.getById wird ausgeführt');
      }, function(response) {
        console.log('error', response);
      });
    };
    
    self.checkToken = function()
    {
      if(simpleStorage.get('secToken') == null)
      {
        document.location.href = ('/#/users/authenticate');
        console.log("Done");
      }
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