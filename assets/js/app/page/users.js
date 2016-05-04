module.exports = [
  'StorageUsers', 'CommonRequest',
function(
  StorageUsers, CommonRequest
) {
  'use strict';
  var self = this;

  self.details = {};

  CommonRequest.users.get({}, function(response) {
    if (response && response.message) {
      self.list = response.message;
    }
  });

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
