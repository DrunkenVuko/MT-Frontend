module.exports = [
  'CommonRequest',
function(
  CommonRequest
) {

  'use strict';
  var self = this;
  self.data = null;

  self.reload = function() {
    CommonRequest.users.get({}, function(response) {
      if (response && response.message) {
        self.list = response.message;
      }
    });
  };

  self.reload();

  self.getList = function () {
    return self.list;
  };

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
