var gulp = require('gulp')
  , browserSync = require('browser-sync')
  , reload = browserSync.reload
  , webpack = require('gulp-webpack')
  , jade = require('gulp-jade')
  , autoprefixer = require('gulp-autoprefixer')
  , uglify = require('gulp-uglify')
  , concat = require('gulp-concat')
  , stylus = require('gulp-stylus')
  , koutoSwiss = require('kouto-swiss')
  , path = require('path')
  , iconify = require('gulp-iconify')
  , gutil = require('gulp-util')
  , minifyCSS = require('gulp-minify-css')
  , ftp = require('gulp-ftp')
  , defaultLang = 'ru'

gulp.task('stylus', function () {
  var lang = gutil.env.lang || defaultLang
  return gulp.src('./src/stylus/main.styl')
    .pipe(stylus({ use: [ koutoSwiss() ] }))
    .pipe(gutil.env.type === 'production' ? minifyCSS() : gutil.noop())
    .pipe(gulp.dest('./dist/'+lang+'/css/'))
    .pipe(reload({ stream : true }))
})

gulp.task('jade', function() {
  var lang = gutil.env.lang || defaultLang
  var dataPath = './src/data/'+lang
  return gulp.src('./src/views/pages/*.jade')
    .pipe(jade({ 
      locals: { 
        intro : require(dataPath+'/intro.js'),
        slides : require(dataPath+'/slides.js'),
        subscribeView : require(dataPath+'/subscribe.js'),
        footer : require(dataPath+'/footer.js'),
        links : require(dataPath+'/links.js'),
        credits : require(dataPath+'/credits.js'),
        references : require(dataPath+'/references.js'),
        gratitudes : require(dataPath+'/gratitudes.js')
      }
    }))
    .pipe(gulp.dest('./dist/'+lang+'/'))
})

gulp.task('images', function() {
  var lang = gutil.env.lang || defaultLang
  return gulp.src('./src/images/*.*')
    .pipe(gulp.dest('./dist/'+lang+'/images/'))
})

gulp.task('videos', function() {
  var lang = gutil.env.lang || defaultLang
  return gulp.src('./src/videos/*.*')
    .pipe(gulp.dest('./dist/'+lang+'/videos/'))
})

gulp.task('iconify', function() {
  var lang = gutil.env.lang || defaultLang
  return iconify({
    src: './src/icons/*.svg',
    cssOutput: './dist/'+lang+'/css/',
    pngOutput: './dist/'+lang+'/images/icons/',
    scssOutput: './dist/scss/'
  })
})

gulp.task('js', function(){
  var lang = gutil.env.lang || defaultLang
  return gulp.src('./src/js/index.js')
    .pipe(webpack({ 
      output : { filename : 'index.js' },
      loaders: [
        { test: require.resolve('jquery'), loader: 'imports?jQuery=jquery' },
      ],
      resolve : {
        alias: {
          TweenMax : path.join(__dirname +  '/src/vendor/gsap/src/uncompressed/TweenMax.js'),
          TweenLite : path.join(__dirname + '/src/vendor/gsap/src/uncompressed/TweenLite.js'),
          TimelineMax : path.join(__dirname + '/src/vendor/gsap/src/uncompressed/TimelineMax.js')
        }
      }
    }))
    .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
    .pipe(gulp.dest('./dist/'+lang+'/js/'))
})

gulp.task('browser-sync', function() {
  var lang = gutil.env.lang || defaultLang
  browserSync({
    server: { baseDir: './dist/'+lang+'/' },
    port: 7200,
    open: false
  })
})

gulp.task('build', ['stylus','jade','js','iconify','images','videos'])

gulp.task('go', ['build','browser-sync'], function() {
  gulp.watch('./src/stylus/**/*.styl', ['stylus'])
  gulp.watch('./src/views/**/*.jade', ['jade', reload])
  gulp.watch('./src/js/**/*.js', ['js', reload])
})
