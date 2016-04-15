
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');

var files = ['server.js', 'gulpfile.js'];
var testFiles = ['./test/**/*.js'];

gulp.task('lint:test', () => {
  return gulp.src('./test/**/test.js')
    .pipe(eslint({}))
    .pipe(eslint.format());
});

gulp.task('lint:nontest', () => {
  return gulp.src(files)
    .pipe(eslint({}))
    .pipe(eslint.format());
});

gulp.task('test', () => {
  return gulp.src(testFiles)
    .pipe(mocha({ reporter: 'nyan' }));
});


gulp.task('watch', () => {
  gulp.watch([files, testFiles], ['default']);
});

gulp.task('lint', ['lint:test', 'lint:nontest']);
gulp.task('default', ['lint', 'test']);
