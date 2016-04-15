const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const gutil = require('gulp-util');

var files =['index.js', 'lib/**/*.js', 'test/**/*.js','gulpfile.js'];

gulp.task('mocha', function(){
  return gulp.src(['./test/**/*test.js'], { read : false })
  .pipe(mocha({
    reporter:'nyan'
  }))
  .on('error', gutil.log);
});

gulp.task('lint:test', function(){
  return gulp.src('lint:test', ()=> {
    return gulp.src('./test/**/image_test.js')
    .pipe(eslint({
      useEslintrc: false,
      warnFileIgnored:true,
      rules:{
        'indent':['error', 2],
        'semi':1,
        'quotes':[1, 'single']
      },
      env:{
        'browser':true,
        'jquery':true,
        'es6': true,
        'node':true
      },
      envs:[
        'mocha',
      ]
    }));
  });
});

gulp.task('lint:nontest', ()=>{
  return gulp.src(files)
  .pipe(eslint({
    useEslintrc: false,
    warnFileIgnored:true,
    rules:{
      'semi':1,
      'indent':['error', 2],
      'quotes':[1, 'single']
    },
    env:{
      'browser':true,
      'jquery':true,
      'es6': true,
      'node':true
    },
  }))
  .pipe(eslint.format());
});



gulp.task('watch-files',['mocha'], function(){
  gulp.watch(['lib/**', 'test/**'],['mocha']);
  gulp.watch(['lib/**', 'test/**'],['lint:test']);
  gulp.watch(['lib/**', 'test/**'],['lint:nontest']);
});


gulp.task('index', ['watch-files']);
gulp.task('default', ['index']);
