const gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  babel = require('gulp-babel'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  fs = require('fs');

gulp.task('build:es6', () => {
  gulp.src(['./src/fuckmyscroll.js', './src/export.es6.js'])
    .pipe(concat('fuckmyscroll.es6.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('build:es5',  () => {
  gulp.src(['./src/fuckmyscroll.js', './src/module.exports.js'])
    .pipe(babel({
      presets: ['es2015', 'stage-1']
    }))
    .pipe(concat('fuckmyscroll.js'))
    .pipe(gulp.dest('./dist'));

  fs.unlink('./dist/fuckmyscroll.min.js', () => {
    gulp.src('./dist/fuckmyscroll.js')
      .pipe(uglify())
      .pipe(rename('fuckmyscroll.min.js'))
      .pipe(gulp.dest('./dist'));
  });
});

gulp.task('default', ['build:es6', 'build:es5']);