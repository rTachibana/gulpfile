// Minimum config
var fs        = require('fs');
var path      = require('path');

var gulp      = require('gulp');
var plumber   = require('gulp-plumber');
var rename    = require('gulp-rename');
var scss      = require('gulp-sass');
var pcss      = require('gulp-postcss');
var maps      = require('gulp-sourcemaps');
var imgMin    = require('gulp-imagemin');
var imgMinP   = require('imagemin-pngquant');
var imgMinJ   = require('imagemin-mozjpeg');
// and more packages
// ----
// typescript-require
// autoprefixer
var getFolders = (dir) => {
    return fs.readdirSync(dir)
        .filter((file) => {
            return fs.statSync(path.join(dir, file)).isDirectory();
        });
}

var date = require('date-utils');
var dt = new Date();
var ts = dt.toFormat("YYYYMMDDHH24MI");

interface Path {
    src_css: string;
    src_img: string;
    dst_css: string;
    dst_img: string;
}
// setting paths
var Path = {
    src_css: './source/scss/',
    src_img: './source/img/',
    dst_css: './publish/css/',
    dst_img: './publish/img/',
    bk_img: './_bk/'
}


// plefix optimize
var browser = [
    "last 1 safari versions",
    'ie >=  11',
    'android >= 5'
]
var quality =  '80-90';

gulp.task('t',() => {
    console.log(ts);
})

gulp.task('img', () => {
    gulp.src( './source/img/' + '*.png' )
        .pipe(gulp.dest(Path.bk_img + ts))
        .pipe(imgMin([
            imgMinP({
                quality: quality,
                speed: 1,
                floyd: 0
            }),
            imgMinJ({
                quality: quality,
                speed: 1,
                progressive: true
            }),
            imgMin.svgo(),
            imgMin.optipng()
        ]))
        .pipe(gulp.dest(Path.dst_img));
});
