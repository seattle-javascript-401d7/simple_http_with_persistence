const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');

var files = ['server.js', 'gulpfile.js', './lib/**/*.js'];

gulp.task('lint:files', () => {
  return gulp.src(files)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('mocha', () => {
  return gulp.src('./test/**/*.test.js')
    .pipe(mocha());
});

gulp.task('lint', ['lint:files']);
gulp.task('default', ['lint', 'mocha']);

gulp.watch(files, ['default']);
