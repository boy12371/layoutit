'use strict';

var gulp = require('gulp'),
  sourceMap = require('gulp-sourcemaps');
var browserSync = require('browser-sync'),
  reload = browserSync.reload;

gulp.task('js', function () {
  return gulp.src('./src/js/**/*.js')
    .pipe(sourceMap.init())
    .pipe(sourceMap.write('./', { addComment: false }))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('css', function () {
  return gulp.src('./src/css/*.css')
    .pipe(sourceMap.init())
    .pipe(sourceMap.write('./', { addComment: false }))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('dir', function () {
  return gulp.src(['./src/**/*.*', '!./src/js/**/*.js', '!./src/css/*.css'])
    .pipe(gulp.dest('./dist'))
    .pipe(reload({ stream: true }));
});

gulp.task('serve', function () {
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });
  gulp.watch('./src/*.html', ['dir']);
});

gulp.task('default', ['js', 'css', 'dir', 'serve'], function () {
  console.log('gulp 任务执行中....')
});