const gulp = require('gulp');
const mocha = require('gulp-mocha');
const eslint = require('gulp-eslint');

const files = ['server', 'index'];

gulp.task('lint:test', () => {
  return gulp.src('./test/**/*test.js')
  .pipe(eslint({
    envs: [
      'mocha',
      'es6'
    ]
  }))
  .pipe(eslint.format());
});

gulp.task('lint:nontest', () => {
  return gulp.src(files)
  .pipe(eslint({
    envs: [
      'es6'
    ]
  }))
  .pipe(eslint.format());
});

gulp.task('mocha', () => {
  return gulp.src('./test/**/*test.js')
  .pipe(mocha());
});

gulp.task('default', ['lint:test', 'lint:nontest', 'mocha']);
