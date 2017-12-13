'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('default', ['watch', 'sass']);

gulp.task('sass', function() {
  return gulp
    .src('./sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/css'));
});

gulp.src('./node_modules/bootstrap-sass/assets/fonts/bootstrap/*')
    .pipe(gulp.dest('./public/css/bootstrap/'));

gulp.src('./node_modules/axios/dist/axios.min.js')
  .pipe(gulp.dest('./public/js/'));

gulp.task('watch', function() {
  gulp.watch('./sass/**/*.scss', ['sass']);
});
