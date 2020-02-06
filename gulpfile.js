let gulp = require('gulp');
let rename = require('gulp-rename');
let sass = require('gulp-sass');

gulp.task('sass', function () {
	return gulp.src('./scss/styles.scss')
		.pipe(sass())
		.pipe(rename('style.css'))
		.pipe(gulp.dest('./css/'));
});