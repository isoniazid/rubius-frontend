const { src, dest, series, watch, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const clean = require('gulp-clean');
const browserSync = require('browser-sync').create();
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const webpackStream = require('webpack-stream');
const rename = require('gulp-rename');


function buildJS() {
    return src('src/js/index.js')
        .pipe(webpackStream(require('./webpack.config')))
        .pipe(rename('main.min.js'))
        .pipe(dest('src/js'))
        .pipe(dest('dist/js'))
        .pipe(browserSync.stream());
}


function buildSass() {
    return src('src/styles/styles.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({ includePaths: ['./node_modules'] }).on('error', sass.logError))
        .pipe(
            postcss([
                autoprefixer({
                    grid: true,
                    overrideBrowserslist: ['last 2 versions']
                }),
                cssnano()
            ])
        )
        .pipe(sourcemaps.write())
        .pipe(dest('src/compiled-styles/'))
        .pipe(dest('dist/compiled-styles/'))
        .pipe(browserSync.stream());
}

function buildHtml() {
    return src('src/**/*.html')
        .pipe(dest('dist'))
        .pipe(browserSync.stream());
}

function copy() {
    return src(["src/img/**/*.*"])
        .pipe(dest("dist/img"));
}

function clearDist() {
    return src('dist', { allowEmpty: true })
        .pipe(clean());
}

function serve() {
    watch('src/styles/**/*.scss', buildSass);
    watch('src/**/*.html', buildHtml);
    watch(['src/**/*.js', '!src/js/**/*.min.js'], buildJS);
}

function createDevServer() {
    browserSync.init(
        {
            server: 'src',
            notify: false
        }
    )
}

exports.build = series(clearDist, buildSass, buildJS, buildHtml, copy);
exports.default = series(series(buildSass, buildJS), parallel(createDevServer, serve));