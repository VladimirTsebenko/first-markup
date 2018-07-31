const gulp = require('gulp');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-clean-css');
const concatCSS = require('gulp-concat-css');
const prefix = require('gulp-autoprefixer');
const browserSync = require("browser-sync");
const reload = browserSync.reload;

const config = {
    scssPath: 'scss/**/*.scss',
    webServer: {
        server: {
            baseDir: './'
        },
        tunnel: false,
        host: 'localhost',
        port: 9000,
        logPrefix: 'frontend'
    }
};

gulp
    .task('serve', () => browserSync(config.webServer))
    .task('styles', () => {
        return gulp.src(config.scssPath)
            .pipe(sass())
            .pipe(prefix('last 2 versions'))
            .pipe(concatCSS('bundle.min.css'))
            .pipe(minifyCSS())
            .pipe(gulp.dest('css'))
            .pipe(reload({stream: true}));
    })
    .task('watch', () =>   gulp.watch(config.scssPath, ['styles']))
    .task('default', ['serve', 'watch', 'styles']);