var gulp = require('gulp');
var eslint = require('gulp-eslint');
var mocha = require('gulp-mocha');

var files = ['gulpfile.js', 'lib/*.js', 'test/*.js'];

gulp.task('lint', ['test'], () => {
  return gulp.src(files)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('test', () => {
  return gulp.src(files)
    .pipe(mocha());
});

gulp.task('default', ['lint', 'test']);
