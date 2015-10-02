'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var babel = require('gulp-babel');
var browserify = require('browserify');
var connect = require('gulp-connect');
var source = require('vinyl-source-stream');
var watchify = require('watchify');

gulp.task('connect', ['javascript'], function() {
  connect.server({
    root: 'demo',
    livereload: true
  });
});

gulp.task('html', ['javascript'], function () {
  gulp.src('./demo/*.html')
    .pipe(connect.reload());
});

gulp.task('javascript', ['babel'], function() {
  var b = browserify('./demo/build/translated/demo.js');
  var w = watchify(b);
  return w
    .bundle()
      .on('error', gutil.log)
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./demo/build/'));
});

gulp.task('babel', function () {
  return gulp.src('./demo/js/*.js')
    .pipe(babel())
      .on('error', gutil.log)
    .pipe(gulp.dest('./demo/build/translated'));
});

gulp.task('watch', function () {
  gulp.watch(['./demo/*.html', './demo/styles/*.css', './demo/js/*.js'], ['html']);
});

gulp.task('default', ['connect', 'watch']);
