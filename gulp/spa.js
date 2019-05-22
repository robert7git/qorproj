var gulp = require('gulp');
var webpack = require('gulp-webpack');
import { ROOTDIR, DISTDIR, SPA_CONF_PROD } from './config';

console.log(ROOTDIR);
console.log(DISTDIR);
// console.log(process.env)
// console.log(process.cwd())

export function spa(params) {
  gulp.task('spa:build', function() {
    return (
      gulp
        // .src('./app/spa/src/index.js')
        // .pipe(webpack())
        .pipe(webpack(require(SPA_CONF_PROD)))
        .pipe(gulp.dest(DISTDIR))
    );
  });
}
