var ASSETS_DIR = 'assets/';
var PUBLIC_DIR = 'public/';

var config = {
  paths : {
    source : {
      templates   : ASSETS_DIR + 'templates/**/*.html',
      jshint      : ASSETS_DIR + 'js/**/*.js',
      styles      : ASSETS_DIR + 'css/**/*.{sass,scss}',
      scripts     : ASSETS_DIR + 'js/main.js',
      scripts_env : ASSETS_DIR + 'js/app/environment.js',
      images      : ASSETS_DIR + 'images/**/*.{png,jpg,jpeg,gif,svg}',
      copy        : ASSETS_DIR + 'copy/**/*',
      rev         : ASSETS_DIR + 'rev/',
      root        : ASSETS_DIR
    },
    dest : PUBLIC_DIR,
    destination : {
      templates      : PUBLIC_DIR,
      styles         : PUBLIC_DIR + 'css/',
      scripts        : PUBLIC_DIR + 'js/',
      images         : PUBLIC_DIR + 'images/',
      root           : PUBLIC_DIR
    }
  }
};

module.exports = config;
