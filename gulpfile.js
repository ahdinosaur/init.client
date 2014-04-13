var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var refresh = require('gulp-livereload');
var lr = require('tiny-lr');
var server = lr();

gulp.task('fonts', function () {
  return gulp.src(['./node_modules/semantic/src/fonts/*'])
    .pipe(gulp.dest('./fonts/'));
});

gulp.task('build', function () {
  return browserify('./')
    .transform({
      global: true,
    }, 'uglifyify')
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./'))
});

gulp.task('watch', function () {
  var bundler = watchify('./')
  var rebundle = function () {
    return bundler.bundle({ debug: true })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./'))
    .pipe(refresh(server));
  }
  bundler.on('update', rebundle);
  return rebundle();
});
 
gulp.task('lr-server', function (cb) {
  server.listen(35729, cb);
});

gulp.task('develop', ['lr-server', 'fonts', 'watch']);

gulp.task('default', ['fonts', 'build']);
