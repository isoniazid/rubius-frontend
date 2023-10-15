const { src, dest, series, watch, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const clean = require('gulp-clean');
const browserSync = require('browser-sync').create();
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');

function buildSass() {
    return src('src/styles/**/*.scss')
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
        .pipe(concat('styles.css'))
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
}

function createDevServer() {
    browserSync.init(
        {
            server: 'src',
            notify: false
        }
    )
}

exports.build = series(clearDist, buildSass, buildHtml, copy);
exports.default = series(buildSass, parallel(createDevServer, serve));