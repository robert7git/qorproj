import gulp from 'gulp';
import babel from 'gulp-babel';
import sourcemaps from 'gulp-sourcemaps';

var plugins = require('gulp-load-plugins')();

export function qor(params) {
  var pathto = function(file) {
    return './public/' + file;
  };
  var scripts = {
    src: pathto('javascripts/*.js'),
    dest: pathto('dist'),
  };
  var styles = {
    src: pathto('stylesheets/*.scss'),
    scss: pathto('stylesheets/**/*.scss'),
    dest: pathto('dist'),
  };

  gulp.task('js', function() {
    return gulp
      .src(scripts.src)
      .pipe(babel())
      .pipe(plugins.concat('app.js'))
      .pipe(plugins.uglify())
      .pipe(gulp.dest(scripts.dest));
  });

  gulp.task('sass', function() {
    return gulp
      .src(styles.src)
      .pipe(sourcemaps.init())
      .pipe(plugins.sass())
      .pipe(plugins.csscomb())
      // .pipe(plugins.cleanCss())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(styles.dest));
  });

  gulp.task('watch', function() {
    gulp.watch(scripts.src, ['js']);
    gulp.watch(styles.scss, ['sass']);
  });

  gulp.task('default', ['watch']);
}
