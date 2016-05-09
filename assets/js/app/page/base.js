module.exports = ['CommonBrowser', function(CommonBrowser) {
  'use strict';
  var self = this;

  self.viewLocked = true;
  // console.log('CommonBrowser', CommonBrowser);

  self.getDimensions = CommonBrowser.getAbsoluteClientRect;

  console.log('self.test', self.test);
}];
