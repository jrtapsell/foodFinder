var gulp = require('gulp');
var handlebars = require('gulp-handlebars');
var handlebarsStatic = require('gulp-compile-handlebars');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');
var concat = require('gulp-concat');
var merge = require('merge-stream');
var sitemap = require('gulp-sitemap');
var rename = require("gulp-rename");

gulp.task('templates', function(){
  return gulp.src('./src/hbs/place.hbs')
    .pipe(handlebars({
      handlebars: require('handlebars')
    }))
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    .pipe(declare({
      namespace: 'templates',
      noRedeclare: true  // Avoid duplicate declarations
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('dist/js/'));
});

gulp.task('index', function () {
      return gulp.src('./src/hbs/index.hbs')
        .pipe(handlebarsStatic(null, {
          ignorePartials: false,
          compile: {strict: true},
          batch: ['src/'],
        }))
        .pipe(rename("index.html"))
        .pipe(gulp.dest('dist/'));
});

gulp.task('singlepages', function () {
  var data = require("./src/data/data.json");
  var tasks = [];
  for (var key in data) {
    var value = data[key];
    tasks.push(
      gulp.src('./src/hbs/singlepage.hbs')
        .pipe(handlebarsStatic(value, {
          ignorePartials: false,
          compile: {strict: true},
          helpers: {
            'time': function(arg) {
              var hours =  Math.floor(arg / 3600);
              var minutes = Math.floor((arg / 60) % 60);
              var text = "";
              if (hours < 10) {
                text += "0";
              }
              text += hours;
              text += ":";
              if (minutes < 10) {
                text += "0";
              }
              text += minutes;
              return text;
            }
          }
        }))
        .pipe(rename(key + ".html"))
        .pipe(gulp.dest('dist/pages')))
  }
  return merge.apply(null, tasks);
});

function copy(src, dst) {
  return function(){
    return gulp.src(src)
      .pipe(gulp.dest(dst));
  }
}

gulp.task('sw-maker', function(callback) {
  var path = require('path');
  var swPrecache = require('sw-precache');

  swPrecache.write("dist/service-worker.js", {
    staticFileGlobs: ['dist/**/*'],
    stripPrefix: 'dist'
  }, callback);
});

gulp.task('css', copy("src/css/*.css", "dist/css/"));
gulp.task('data', copy("src/data/*.json", "dist/data/"));
gulp.task('img', copy("src/img/*", "dist/img/"));
gulp.task('js', copy("src/js/*.js", "dist/js/"));
gulp.task('res', copy("src/res/*", "dist/res/"));
gulp.task('extra', copy("extra/*", "dist/"));
gulp.task('sw-installer', copy("src/sw/*", "dist/"));
gulp.task('manifest', copy("src/manifest/manifest.json", "dist/"));

gulp.task('sitemap', function () {
  return gulp.src('dist/**/*.html', {
      read: false
    })
    .pipe(sitemap({
      siteUrl: 'http://food.jrtapsell.co.uk'
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('default', gulp.series('templates', 'css', 'data', 'img', 'js', 'res','index', 'sw-installer', 'manifest', 'singlepages', 'sw-maker', 'extra', 'sitemap'));