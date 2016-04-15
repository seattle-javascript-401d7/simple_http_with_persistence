const gulp = require('gulp'); // eslint-disable-line keyword-spacing
const eslint = require('gulp-eslint');

var files = ['./test/**/*test.js', 'gulpfile.js', 'server.js'];


gulp.task('lint', () => {
  return gulp.src(files)
  .pipe(eslint({
    'env': [
      'mocha'
    ]
  }))
  .pipe(eslint.format());
});
