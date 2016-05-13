module.exports = [
  'StorageUsers', 'CommonRequest',
function(
  StorageUsers, CommonRequest
) {
  'use strict';
  var self = this;
  self.details = {};

  CommonRequest.users.getAll({'x-access-token' : getCookie('token')}, {}, function(response) {
    //delCookie('tempID');
    if (response && response.message) {
      self.list = response.message;
      console.log('Ohne Cookie Wird ausgeführt!!!!!');

    }
  });

  CommonRequest.users.getUserById({'x-access-token' : getCookie('token'), userId : getCookie('tempID')}, {}, function(response) {
    if (response && response.message) {
      console.log('Mit Parameter START');
      console.log(response.message);
      self.tempUser = response.message;
      console.log('Mit Parameter ENDE');
    }
  });

  self.updateProfile = function() {
      CommonRequest.users.changeProfile({
        userId : getCookie('tempID')
      },  {
          "x-access-token": getCookie('token'),
          "username" : self.tempUser.username,
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
      // raw: {
      //     "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwic2VsZWN0ZWQiOnsiaGFzaCI6MCwic2FsdCI6MH0sImdldHRlcnMiOnt9LCJ3YXNQb3B1bGF0ZWQiOmZhbHNlLCJhY3RpdmVQYXRocyI6eyJwYXRocyI6eyJzdHJlZXRudW1iZXIiOiJpbml0Iiwic3RyZWV0IjoiaW5pdCIsInppcCI6ImluaXQiLCJjaXR5IjoiaW5pdCIsImNvbXBhbnkiOiJpbml0IiwibGFzdG5hbWUiOiJpbml0IiwiZmlyc3RuYW1lIjoiaW5pdCIsInBhc3N3b3JkIjoiaW5pdCIsImVtYWlsIjoiaW5pdCIsInVzZXJuYW1lIjoiaW5pdCIsIl9fdiI6ImluaXQiLCJfaWQiOiJpbml0In0sInN0YXRlcyI6eyJpZ25vcmUiOnt9LCJkZWZhdWx0Ijp7fSwiaW5pdCI6eyJfX3YiOnRydWUsInVzZXJuYW1lIjp0cnVlLCJsYXN0bmFtZSI6dHJ1ZSwiZW1haWwiOnRydWUsImNvbXBhbnkiOnRydWUsImNpdHkiOnRydWUsInppcCI6dHJ1ZSwic3RyZWV0Ijp0cnVlLCJzdHJlZXRudW1iZXIiOnRydWUsInBhc3N3b3JkIjp0cnVlLCJmaXJzdG5hbWUiOnRydWUsIl9pZCI6dHJ1ZX0sIm1vZGlmeSI6e30sInJlcXVpcmUiOnt9fSwic3RhdGVOYW1lcyI6WyJyZXF1aXJlIiwibW9kaWZ5IiwiaW5pdCIsImRlZmF1bHQiLCJpZ25vcmUiXX0sImVtaXR0ZXIiOnsiZG9tYWluIjpudWxsLCJfZXZlbnRzIjp7fSwiX2V2ZW50c0NvdW50IjowLCJfbWF4TGlzdGVuZXJzIjowfX0sImlzTmV3IjpmYWxzZSwiX2RvYyI6eyJfX3YiOjAsInVzZXJuYW1lIjoidGVtcCIsImxhc3RuYW1lIjoiTXVzdGVybWFubiIsImVtYWlsIjoidGVtcEB0ZW1wLmJlIiwiY29tcGFueSI6IlJlc3RhdXJhbnQgVGVtcCIsImNpdHkiOiJCZXJsaW4iLCJ6aXAiOiIxMDE3OSIsInN0cmVldCI6IktvZXBlbmlja2VyIFN0cmFzc2UiLCJzdHJlZXRudW1iZXIiOiI0MyIsInBhc3N3b3JkIjoiOWIwYjBmYjJjMjkwZTYyNmRlMDMxMGNjNjI3OGQ0OWEiLCJmaXJzdG5hbWUiOiJNYXgiLCJfaWQiOiI1NzJmNjlhOTgwYzJlYTg0NDIyYTA4MjMifSwiX3ByZXMiOnsiJF9fb3JpZ2luYWxfc2F2ZSI6W251bGwsbnVsbCxudWxsXX0sIl9wb3N0cyI6eyIkX19vcmlnaW5hbF9zYXZlIjpbXX0sImlhdCI6MTQ2MzEyNTMzNiwiZXhwIjoxNDYzMTY4NTM2fQ.T9DOSk9ePrMjFufi8tQYtmdZEAAMQnL5xDdss1rR9Fw",
      //     "username" : "lalalala@gmx.de"
      //     }


self.login = function() {
  CommonRequest.users.getTokenByLogin({}, {
    user: self.goran, password: self.goran2
  }, function (response) {
    if (response && response.message) {
      //console.log(response);
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