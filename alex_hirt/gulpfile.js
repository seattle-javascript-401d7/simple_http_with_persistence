const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');

var allScripts = ['./*.js', './lib/**/*.js', './test/**/*.js'];

gulp.task('lint', () => {
  return gulp.src(allScripts)
    .pipe(eslint({
      envs: [
        'es6',
        'mocha'
      ]
    }))
    .pipe(eslint.format());
});

gulp.task('lint:watch', () => {
  gulp.watch(allScripts, ['lint']);
});

var testScripts = ['./test/**/*.js'];

gulp.task('mocha', () => {
  return gulp.src(testScripts)
    .pipe(mocha({ 'reporter': 'nyan' }));
});

gulp.task('mocha:watch', () => {
  gulp.watch(testScripts, ['mocha']);
});

gulp.task('all', ['lint']);
gulp.task('default', ['all']);
