var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var dist = './dist';
var files = {
	js: './src/ion-tinder-cards.js',
	sass: './src/ion-tinder-cards.scss'
};

gulp.task('default', ['lint'], function(done) {
	gulp.src(files.js)
	.pipe(uglify())
	.pipe(rename({ extname: ".min.js" }))
	.pipe(gulp.dest(dist))

	gulp.src(files.js)
	.pipe(gulp.dest(dist))

	gulp.src(files.sass)
	.pipe(sass())
	.pipe(minify())
	.pipe(rename({ extname: '.min.css' }))
	.pipe(gulp.dest(dist))

	gulp.src(files.sass)
	.pipe(sass())
	.pipe(gulp.dest(dist))

	.on('end', done);
});

gulp.task('lint', function() {
	return gulp.src(files.js)
	.pipe(jshint())
	.pipe(jshint.reporter('jshint-stylish'))
	.pipe(jshint.reporter('fail'));
});