let gulp = require('gulp');
let sass = require('gulp-sass');
let webpack = require('webpack-stream');
let htmlmin = require('gulp-html-minifier');
let cleancss = require('gulp-clean-css');
let babel = require('gulp-babel');
let sourcemaps = require('gulp-sourcemaps');
let concat = require('gulp-concat');
let rename = require('gulp-rename');
let browserSync = require('browser-sync').create();

gulp.task('sass', () => gulp.src('./src/styles/scss/**/*.scss')
.pipe(sass().on('error', sass.logError))
.pipe(rename('app.css'))
.pipe(gulp.dest('./src/styles'))
);

gulp.task('webpack', () => gulp.src('./src/scripts/modules/**/*.js')
.pipe(webpack(
  require('./webpack.config.js')
))
.pipe(gulp.dest('./src/scripts'))
);

gulp.task('htmlmin', () => gulp.src('./src/index.html')
.pipe(htmlmin({collapseWhitespace: true}))
.pipe(gulp.dest('./dist'))
);

gulp.task('cleancss', () => gulp.src('./src/styles/app.css')
.pipe(htmlmin({collapseWhitespace: true}))
.pipe(gulp.dest('./dist/styles'))
);

gulp.task('babel', () => gulp.src('./src/scripts/app.js')
.pipe(sourcemaps.init())
.pipe(babel())
.pipe(concat('app.js'))
.pipe(sourcemaps.write('.'))
.pipe(gulp.dest('./dist/scripts'))
);

// Resource
// Libs
// Frameworks

gulp.task('debug', () => {
  browserSync.init({
    server: {
      baseDir: './src'
    }
  });
});

gulp.task('run', () => {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  });
});

gulp.task('build', ['sass', 'webpack']);
gulp.task('pack', ['htmlmin', 'cleancss', 'babel']);
gulp.task('development', ['sass', 'webpack', 'debug'], () => {
  gulp.watch('./src/styles/scss/**/*.scss', ['sass']);
  gulp.watch('./src/scripts/modules/**/*.js', ['webpack']);
  gulp.watch('./src/index.html', browserSync.reload);
  gulp.watch('./src/styles/app.css', browserSync.reload);
  gulp.watch('./src/scripts/app.js', browserSync.reload);
});
