var gulp = require('gulp');
var handlebars = require('gulp-handlebars');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');
var concat = require('gulp-concat');

gulp.task('templates', function(){
  return gulp.src('./src/hbs/*.hbs')
    .pipe(handlebars({
      handlebars: require('handlebars')
    }))
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    .pipe(declare({
      namespace: 'templates',
      noRedeclare: true, // Avoid duplicate declarations
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('dist/js/'));
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
gulp.task('index', copy("src/index.html", "dist/"));
gulp.task('extra', copy("extra/*", "dist/"));
gulp.task('sw-installer', copy("src/sw/*", "dist/"));
gulp.task('manifest', copy("src/manifest/manifest.json", "dist/"));


gulp.task('default', gulp.series('templates', 'css', 'data', 'img', 'js', 'res','index', 'sw-installer', 'manifest.json', 'sw-maker', 'extra'));