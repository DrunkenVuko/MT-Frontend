module.exports = [
  'StorageUsers', 'CommonRequest',
function(
  StorageUsers, CommonRequest
) {
  'use strict';
  var self = this;
  self.goran;


  self.details = {};

  CommonRequest.users.get({}, function(response) {
    if (response && response.message) {
      self.list = response.message;
    }
  });

self.login = function() {
  CommonRequest.users.getTokenByLogin({}, {
    user: self.goran, password: self.goran2
  }, function (response) {
    if (response && response.message) {
      //console.log(response);
      document.cookie = "token=" + response.token;
      console.log(getCookie("token"));
    }
  });
};
  self.getById = function (theDesiredUserId) {

    CommonRequest.users.getUserById({
      userId : theDesiredUserId
    }, function(response) {
      console.log('response', response.message);
      self.details[theDesiredUserId] = 'Siehe Consolen-Ausgabe...';
    }, function(response) {
      console.log('error', response);
    });
  };
}];

function getCookie(cname) {
  var name = cname + "=";
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
  return "";
}