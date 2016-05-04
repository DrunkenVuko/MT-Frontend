module.exports = [function() {
  'use strict';

  var browser = {
    getAbsoluteClientRect : function(element) {
      var clientRect = element.getBoundingClientRect(),
        bodyClientRect = document.body.getBoundingClientRect();

      return {
        width : clientRect.width,
        height : clientRect.height,
        left : clientRect.left - bodyClientRect.left,
        top : clientRect.top - bodyClientRect.top,
        right : clientRect.right - bodyClientRect.left,
        bottom : clientRect.bottom - bodyClientRect.top,
        fixed : clientRect,
        leftCenter : (clientRect.left - bodyClientRect.left) + (clientRect.width / 2),
        topCenter : (clientRect.top - bodyClientRect.top) + (clientRect.height / 2)
      };
    },

    ensureVisibility : function(targetEl, toElementTop) {
      if (!targetEl) {
        return;
      }

      var windowHeight = document.body.clientHeight,
        acr = this.getAbsoluteClientRect(targetEl);

      if (acr.fixed.top > 0 && (toElementTop ? (acr.fixed.top + 100) : acr.fixed.bottom) < windowHeight) {
        return;
      }

      document.documentElement.scrollTop = Math.round((acr.top + (toElementTop ? 0 : (acr.height / 2))) - (toElementTop ? 0 : (windowHeight / 2)));
      document.body.scrollTop = Math.round((acr.top + (acr.height / 2)) - (windowHeight / 2));
    }
  };

  return browser;
}];
