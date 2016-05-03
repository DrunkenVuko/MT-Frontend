module.exports = [
  'CommonRequest',
function(
  CommonRequest
) {

  'use strict';
  var self = this;
  self.data = null;

  self.getUser = function(userId, cb, cbErr) {
    CommonRequest.users.getUserById({
      userId : userId
    }, function(response) {
      console.log('response', response);
    }, function(response) {
      console.log('error', response);
    });
  };

  return self;
}];
