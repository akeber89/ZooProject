require ('bootstrap')

let gulp = require('gulp');
let cleanCSS = require('gulp-clean-css');
let rename = require('gulp-rename');
let sass = require('gulp-sass');
let concat = require('gulp-concat');
let uglify = require('gulp-uglify-es').default;
​
let input_js_files = ['./js/jquery-3.3.1.slim.js', './js/popper.js', './js/bootstrap.js'];
​
// CSS related tasks
gulp.task('sass', function () {
    return gulp.src('./scss/styles.scss')
        .pipe(sass())
        .pipe(rename('styles.css'))
        .pipe(gulp.dest('./css/'));
});
​
gulp.task('minify-css', () => {
    return gulp.src('css/styles.css')
        .pipe(cleanCSS())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./css/'));
});
​
gulp.task('styles', gulp.series('sass', 'minify-css'));
​
// JS related tasks
gulp.task('combine-js', function () {
    return gulp.src(input_js_files)
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./js/'));
});
​
gulp.task('minify-js', function () {
    return gulp.src('./js/all.js')
        .pipe(rename("all.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest('./js/'));
});
​
gulp.task('scripts', gulp.series('combine-js', 'minify-js'));
​
gulp.task('watch', function () {
    gulp.watch('./scss/**/*.scss', gulp.series('styles'));
​
    gulp.watch(input_js_files, gulp.series('scripts'));
​
    gulp.watch('*.html', gulp.series('html'));
});