module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    reporters: ['spec'],
    browsers: ['PhantomJS'],
    files: [
	  'source/js/angular/angular.js',
	  'source/js/angular/angular-mocks.js',
	  'source/js/angular/angular-route.js',
	  'source/js/app.js',
      'source/js/**/*.js',
      'source/tests/karma/**/*.js'
    ]
  });
};