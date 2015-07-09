var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    webpack = require('gulp-webpack'),
    jade = require('gulp-jade'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    stylus = require('gulp-stylus'),
    koutoSwiss = require('kouto-swiss'),
    path = require('path'),
    iconify = require('gulp-iconify'),
    gutil = require('gulp-util'),
    minifyCSS = require('gulp-minify-css'),
    gulpif = require('gulp-if'),
    gzip = require('gulp-gzip'),
    size = require('gulp-size'),
    merge = require('merge-stream'),
    langs = ['en','ru'];

gulp.task('stylus', function () {
  return gulp.src('./src/stylus/main.styl')
    .pipe(stylus({ use: [ koutoSwiss() ] }))
    .pipe(gutil.env.type === 'production' ? minifyCSS() : gutil.noop())
    .pipe(gulp.dest('./dist/css/'))
    .pipe(reload({ stream : true }));
});

gulp.task('jade', function () {
  var tasks = langs.map(function (lang) {
    var dataPath = './src/data/'+lang
    var data = {
      intro : require(dataPath+'/intro.json'),
      slides : require(dataPath+'/slides.json'),
      subscribeView : require(dataPath+'/subscribe.json'),
      footer : require(dataPath+'/footer.json'),
      links : require(dataPath+'/links.json'),
      credits : require(dataPath+'/credits.json'),
      references : require(dataPath+'/references.json'),
      gratitudes : require(dataPath+'/gratitudes.json')
    };
    return gulp.src('./src/views/pages/*.jade')
      .pipe(jade({locals: data}))
      .pipe(gulp.dest('./dist/'+lang+'/'))
  });

  return merge(tasks);
});

gulp.task('index', function () {
  return gulp.src('./dist/'+langs[0]+'/index.html')
    .pipe(gulp.dest('./dist/'));
});

gulp.task('images', function () {
  return gulp.src('./src/images/*.*')
    .pipe(gulp.dest('./dist/images/'))
});

gulp.task('videos', function () {
  return gulp.src('./src/videos/*.*')
    .pipe(gulp.dest('./dist/videos/'))
});

gulp.task('iconify', function() {
  return iconify({
    src: './src/icons/*.svg',
    cssOutput: './dist/css/',
    pngOutput: './dist/images/icons/',
    scssOutput: './dist/scss/'
  });
});

gulp.task('js', function(){
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
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('browser-sync', function() {
  browserSync({
    server: { baseDir: './dist/' },
    port: 7200,
    open: false
  });
});

gulp.task('gzip', function () {
  return gulp.src('./dist/**/*')
    .pipe(size({title: 'build', gzip: true }))
    .pipe(gulpif('*.js', gzip({ append: false })))
    .pipe(gulpif('*.css', gzip({ append: false })))
    .pipe(gulp.dest('./dist'));
});

gulp.task('build', ['stylus','jade','js','iconify','images','videos'], function () {
  return gulp.src('./dist/'+langs[0]+'/index.html')
    .pipe(gulp.dest('./dist/'));
});

gulp.task('go', ['build','index','browser-sync'], function() {
  gulp.watch('./src/stylus/**/*.styl', ['stylus']);
  gulp.watch('./src/data/**/*.json', ['jade', reload]);
  gulp.watch('./src/views/**/*.jade', ['jade', reload]);
  gulp.watch('./src/js/**/*.js', ['js', reload]);
});
