// Minimum config
const fs        = require('fs');
const path      = require('path');

const gulp      = require('gulp');
const plumber   = require('gulp-plumber');
const rename    = require('gulp-rename');
const sass      = require('gulp-sass');
const stylus    = require('gulp-stylus');
const pcss      = require('gulp-postcss');
const csso      = require('gulp-csso');
const maps      = require('gulp-sourcemaps');
const imgMin    = require('gulp-imagemin');
const imgMinP   = require('imagemin-pngquant');
const imgMinJ   = require('imagemin-mozjpeg');
// and more packages
// ----
// css-mqpacker
// typescript-require
// autoprefixer
const getFolders = (dir) => {
    return fs.readdirSync(dir)
        .filter((file) => {
            return fs.statSync(path.join(dir, file)).isDirectory();
        });
}

const date = require('date-utils');
const dt = new Date();
const ts = dt.toFormat("YYYYMMDDHH24MI");

interface Path {
    src_css: string;
    src_img: string;
    dst_css: string;
    dst_img: string;
}
// setting paths
const Path = {
    src_css: './source/scss/',
    src_img: './source/img/**/*.*',
    dst_css: './publish/css/',
    dst_img: './publish/img/',
    bk_img: './_bk/'
}

// plefix optimize
const browser = [
    "last 1 safari versions",
    'ie >=  11',
    'android >= 5'
]
const quality = 80;
gulp.task('t',() => {
    console.log(ts);
});

gulp.task('css', function () {
    return gulp.src( Path.src_css + '**/**' )
        .pipe(maps.init())
        .pipe(sass( {outputStyle: 'expanded' }))
        .pipe(pcss([
            require('css-mqpacker')(),
            require('autoprefixer')({
                browsers: browser
            }),
        ]))
        .pipe(maps.write('./'))
        .pipe(gulp.dest( Path.dst_css ))
});

gulp.task('img', () => {
    gulp.src( Path.src_img )
        .pipe(gulp.dest( Path.bk_img + ts ))
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
        .pipe(gulp.dest( Path.dst_img ));
});
