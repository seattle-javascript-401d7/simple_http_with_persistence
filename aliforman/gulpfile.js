'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
var files = ['server.js', 'gulpfile.js', '!node_modules/**'];

gulp.task('lint:test', () => {
  gulp.src('./test/**/*test.js')
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('lint:nontest', () => {
  gulp.src(files)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('mocha:test', () => {
  gulp.src('./test/**/*test.js')
   .pipe(mocha());
});

gulp.task('watch', () => {
  gulp.watch('./test/**/*test.js', ['lint:test', 'mochaTest']);
  gulp.watch(files, ['lint:nontest', 'mochaTest']);
});

gulp.task('lint', ['lint:test', 'lint:nontest']);
gulp.task('mochaTest', ['mocha:test']);
gulp.task('default', ['lint:test', 'lint:nontest', 'mocha:test']);
