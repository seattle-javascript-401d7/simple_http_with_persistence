var gulp = require('gulp');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');
var startServer = require('./server.js').startServer;

gulp.task('default', ['eslint'], function() {});



gulp.task('test', function() {
  return gulp.src(['*.js', '*/*.js'])
  .pipe(mocha)
});

gulp.task('eslint', function() {
  return gulp.src(['*.js', '*/*.js'])
    .pipe(eslint())
    .pipe(eslint.reporter('jshint-stylish'));
});


gulp.watch(['*.js', 'test/*js'], ['test', 'eslint'], function() {});
