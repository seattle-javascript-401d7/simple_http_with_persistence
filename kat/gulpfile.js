const gulp = require('gulp');
const eslint = require('gulp-eslint');

var files = ['./data/**/*.json', './test/**/*test.js', 'gulpfile.js', 'server.js'];


gulp.task('lint', () => {
  return gulp.src(files)
  .pipe(eslint({
    'env': [
      'mocha'
    ]
  }))
  .pipe(eslint.format());
});
