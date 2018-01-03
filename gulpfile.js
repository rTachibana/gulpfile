// Minimum config
var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var stylus = require('gulp-stylus');
var pcss = require('gulp-postcss');
var csso = require('gulp-csso');
var maps = require('gulp-sourcemaps');
var imgMin = require('gulp-imagemin');
var imgMinP = require('imagemin-pngquant');
var imgMinJ = require('imagemin-mozjpeg');
// and more packages
// ----
// css-mqpacker
// typescript-require
// autoprefixer
var getFolders = function (dir) {
    return fs.readdirSync(dir)
        .filter(function (file) {
        return fs.statSync(path.join(dir, file)).isDirectory();
    });
};
var date = require('date-utils');
var dt = new Date();
var ts = dt.toFormat("YYYYMMDDHH24MI");
// setting paths
var Path = {
    src_css: './source/scss/',
    src_img: './source/img/**/*.*',
    dst_css: './publish/css/',
    dst_img: './publish/img/',
    bk_img: './_bk/'
};
// settings plefix optimize
var browser = [
    "last 1 safari versions",
    'ie >=  11',
    'android >= 5'
];
// settings imgMin quality
var quality = 80;
gulp.task('css', function () {
    return gulp.src(Path.src_css + '**/**')
        .pipe(maps.init())
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(pcss([
        require('css-mqpacker')(),
        require('autoprefixer')({
            browsers: browser
        }),
    ]))
        .pipe(maps.write('./'))
        .pipe(gulp.dest(Path.dst_css));
});
gulp.task('img', function () {
    gulp.src(Path.src_img)
        .pipe(gulp.dest(Path.bk_img + ts))
        .pipe(imgMin([
        imgMinP({
            quality: quality,
            speed: 1,
            verbose: false
        }),
        imgMinJ({
            quality: quality,
            progressive: true
        }),
        imgMin.svgo(),
        imgMin.optipng()
    ]))
        .pipe(gulp.dest(Path.dst_img));
});
