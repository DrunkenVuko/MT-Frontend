module.exports = [
  'CommonRequest',
function(
    CommonRequest
) {
  'use strict';
  var self = this;
  self.details = {};
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

  CommonRequest.users.getAll({'x-access-token' : getCookie('token')}, {}, function(response) {
    //delCookie('tempID');
    if (response && response.message) {
      self.list = response.message;
      console.log('users.getAll wird ausgeführt');

    }
  });

  CommonRequest.users.getUserById({'x-access-token' : getCookie('token'), userId : getCookie('tempID')}, {}, function(response) {
    if (response && response.message) {
      console.log('users.getUserByIdl wird ausgeführt');
      console.log(response.message);
      self.tempUser = response.message;
    }
  });

  self.updateProfile = function() {
      CommonRequest.users.changeProfile({
        userId : getCookie('tempID')
      },  {
          'x-access-token': getCookie('token'),
          'username' : self.tempUser.username,
          "firstname" : self.tempUser.firstname,
          "lastname" : self.tempUser.lastname,
          "email" : self.tempUser.email,
          "company" : self.tempUser.company,
          "zip" : self.tempUser.zip,
          "city" : self.tempUser.city,
          "street" : self.tempUser.street,
          "streetnumber" : self.tempUser.streetnumber
      }, function(response) {
        console.log('error', response);
      });
    };

self.add = function() {
  CommonRequest.users.addUser({

  }, {
    "username": self.newUser.username,
    "firstname": self.newUser.firstname,
    "lastname": self.newUser.lastname,
    "email": self.newUser.email,
    "company": self.newUser.company,
    "zip": self.newUser.zip,
    "city": self.newUser.city,
    "street": self.newUser.street,
    "streetnumber": self.newUser.streetnumber,
    "password": self.newUser.password
  }, function(response) {
    console.log('error', response);
  });
};

self.login = function() {
  CommonRequest.users.getTokenByLogin({}, {
    user: self.goran, password: self.goran2
  }, function (response) {
    if (response && response.message) {
      console.log(response);
      document.cookie = 'token=' + response.token;
      document.location.href = ('/users/');
      console.log(getCookie('token'));
    }
  });
};

  self.getAll = function () {
    CommonRequest.users.getAll({
      'x-access-token' : getCookie('token')

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
    document.location.href = ('/users/add');
  };

  self.getById = function (theDesiredUserId) {
    CommonRequest.users.getUserById({
      'x-access-token' : getCookie('token'), userId : theDesiredUserId

    },  {}, function(response) {
      self.tempUser = response.message;
      console.log('self.getById wird ausgeführt');
      document.cookie = 'tempID=' + response.message._id;
      document.location.href = ('/users/' + response.message._id);
    }, function(response) {
      console.log('error', response);
    });
  };
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