const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');

var files = [
  __dirname + '/server.js',
  __dirname + '/gulpfile.js',
  __dirname + './lib/**/*.js'
];
var testFiles = [
  __dirname + '/test/**/*test.js'
];

gulp.task('lint:files', () => {
  return gulp.src(files)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('lint:test', () => {
  return gulp.src(testFiles)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('mocha', () => {
  return gulp.src(__dirname + '/test/**/*test.js')
    .pipe(mocha());
});

gulp.task('default', ['lint:files', 'lint:test', 'mocha'], () => {
  process.exit(0);
});
