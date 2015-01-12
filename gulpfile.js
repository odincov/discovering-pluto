var gulp = require('gulp')
  , browserSync = require('browser-sync')
  , reload = browserSync.reload
  , webpack = require('gulp-webpack')
  , jade = require('gulp-jade')
  , debug = require('gulp-debug')
  , autoprefixee = require('gulp-autoprefixer')
  , uglify = require('gulp-uglify')
  , concat = require('gulp-concat')
  , stylus = require('gulp-stylus')
  , koutoSwiss = require('kouto-swiss')

var slidesData = require('./src/data/slides.js')

gulp.task('stylus', function () {
  return gulp.src('./src/stylus/main.styl')
    .pipe(stylus({ use: [ koutoSwiss() ] }))
    .pipe(gulp.dest('./dist/css/'))
    .pipe(reload({ stream : true }))
})

gulp.task('jade', function() {
  return gulp.src('./src/views/pages/*.jade')
    .pipe(jade({ locals: { slides : slidesData }}))
    .pipe(gulp.dest('./dist/'))
})

gulp.task('images', function() {
  return gulp.src('./src/images/*.jpg')
    .pipe(gulp.dest('./dist/images/'))
})

gulp.task('js', function(){
  return gulp.src('./src/js/index.js')
    .pipe( webpack({ output : { filename : 'index.js' }}))
    .pipe(gulp.dest('./dist/js/'))
})

gulp.task('browser-sync', function() {
  browserSync({
    server: { baseDir: './dist/' },
    port: 7200,
    open: false
  })
})

gulp.task('build', ['stylus','jade','js','images'])

gulp.task('go', ['stylus','jade','js','images','browser-sync'], function() {
  gulp.watch('./src/stylus/**/*.styl', ['stylus'])
  gulp.watch('./src/views/**/*.jade', ['jade', reload])
  gulp.watch('./src/js/**/*.js', ['js', reload])
})
