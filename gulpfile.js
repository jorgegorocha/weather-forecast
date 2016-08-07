var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    minifyCSS = require('gulp-minify-css'),
    Server = require('karma').Server,
    protractor = require("gulp-protractor").protractor,
    gulpProtractorAngular = require('gulp-angular-protractor'),
    htmlreplace = require('gulp-html-replace'),
    webserver = require('gulp-webserver');


gulp.task('default', ['webserver-public']);

//start web server with source folder
gulp.task('webserver-source', function () {
    gulp.src('source')
        .pipe(webserver({
            livereload: true,
            directoryListing: false,
            open: false
        }));
});

// check for errors in the JS files
gulp.task('jshint', ['webserver-source'], function () {
    return gulp.src('source/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});

// run unit tests
gulp.task('karma', ['jshint'], function (done) {
    return new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});

//run e2e tests
gulp.task('protractor', ['karma'], function (callback) {
    gulp.src(['source/tests/protractor/**/*.js'])
        .pipe(gulpProtractorAngular({
            'configFile': 'protractor.conf.js',
            'debug': false,
            'autoStartStopServer': true
        }))
        .on('error', function (e) {
            console.log(e);
        })
        .on('end', callback);
});

// unify and minify the application  JS files
gulp.task('minify-scripts', ['protractor'], function () {
    return gulp.src('source/js/*.js')
        .pipe(concat('scripts.js'))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/js'));
});

// copy the angular-*.min files
gulp.task('copy-min-angular', ['minify-scripts'], function () {
    return gulp.src(['source/js/angular/*.min.*'])
        .pipe(gulp.dest('public/js'));
});

// unify and minify all the CSS files
gulp.task('minify-css', ['copy-min-angular'], function () {
    return gulp.src('source/css/styles.css')
        .pipe(minifyCSS())
        .pipe(rename('styles.min.css'))
        .pipe(gulp.dest('public/css'));
});

// copy the bootstrap.min
gulp.task('copy-min-bootstrap', ['minify-css'], function () {
    return gulp.src(['source/css/*.min.*'])
        .pipe(gulp.dest('public/css'));
});

// copy the rest of files to public folder
gulp.task('deploy', ['copy-min-bootstrap'], function () {
    return gulp.src(['source/**/*.*', '!source/tests/**/*.*', '!source/js/**/*.*', '!source/css/**/*.*'])
        .pipe(gulp.dest('public/'));
});

//change the references to the js and css to the minified files
gulp.task('change-js-css', ['deploy'], function () {
    gulp.src('source/index.html')
        .pipe(htmlreplace({
            'css': ['css/bootstrap.min.css', 'css/styles.min.css'],
            'js': ['js/angular.min.js', 'js/angular-route.min.js', 'js/scripts.min.js', 'js/googleplaces.min.js']
        }))
        .pipe(gulp.dest('public'));
});

//start web server with the public folder
gulp.task('webserver-public', ['change-js-css'], function () {
    gulp.src('public')
        .pipe(webserver({
            port: 8080,
            livereload: false,
            directoryListing: false,
            open: true,
            fallback: 'index.html'
        }));
});

