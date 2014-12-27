var gulp = require('gulp')
  , browserSync = require('browser-sync')
  , webpack = require('gulp-webpack')
  , jade = require('gulp-jade')
  , debug = require('gulp-debug')
  , autoprefixee = require('gulp-autoprefixer')
  , uglify = require('gulp-uglify')
  , concat = require('gulp-concat')
  , stylus = require('gulp-stylus')

gulp.task('browser-sync', function() {
  browserSync({
    files: ['dist/css/*.css'],
    server: {
      baseDir: './dist/'
    },
    port: 7200,
    open: false
  })
})

gulp.task('jade', function() {
  return gulp.src('src/views/pages/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('./dist/'))
})
