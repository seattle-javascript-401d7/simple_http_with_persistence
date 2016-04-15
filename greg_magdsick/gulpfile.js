const gulp = require('gulp');
const mocha = require('gulp-mocha');
const eslint = require('gulp-eslint');

gulp.task('mocha', () => {
  return gulp.src('test/**/*_test.js')
    .pipe(mocha({
      reporter: 'spec'
    }));
});

gulp.task('lintTests', () => {
  return gulp.src('./test/**/*test.js')
    .pipe(eslint({
      'env': {
        'mocha': true,
        'node': true,
        'es6': true
      }
    }))
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('lintFiles', () => {
  return gulp.src(['index.js', 'lib/**/*.js', 'gulpfile.js'])
    .pipe(eslint({
      'env': {
        'node': true,
        'ex6': true
      }
    }))
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('default', ['mocha', 'lintTests', 'lintFiles']);
