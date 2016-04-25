const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
var allFiles = ['lib/**/*.js', 'test/**/*_test.js', 'gulpfile.js', 'index.js'];
var testFiles = ['test/**/*_test.js'];

gulp.task('lint', () => {
  return gulp.src(allFiles)
  .pipe(eslint())
  .pipe(eslint.format());
});

gulp.task('test', () => {
  return gulp.src(testFiles)
  .pipe(mocha())
  .once('end', () => {
    process.exit();
  });
});

gulp.task('default', ['lint', 'test']);
