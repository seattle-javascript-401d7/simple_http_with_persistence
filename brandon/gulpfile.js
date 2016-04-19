const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');

gulp.task('lint:test', () => {
  return gulp.src('./test**/*test.js')
    .pipe(eslint({
      envs: [
        'mocha',
        'es6'
      ]
    }))
    .pipe(eslint.format());
});

gulp.task('lint:nontest', () => {
  return gulp.src('./server.js')
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
