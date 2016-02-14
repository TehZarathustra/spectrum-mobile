"use strict";

var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
	useref = require('gulp-useref'),
	gulpif = require('gulp-if'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	minifyCss = require('gulp-minify-css'),
	flatten = require('gulp-flatten'),
	wiredep = require('wiredep').stream;

var onError = function(err) {
	console.log(err);
}

// watcher

gulp.task('default', ['bower','sass','scripts'], function() {
	gulp.watch(['app/sass/*.sass','app/sass/templates/*.sass',], ['sass']);
	gulp.watch(['app/js/main.js'], ['scripts']);
	gulp.watch(['bower.json'], ['bower']);
});

// deploy 

gulp.task('deploy', ['copy'], function () {
	var assets = useref.assets();

	return gulp.src('app/*.html')
		.pipe(assets)
		.pipe(gulpif('*.js', uglify()))
		.pipe(gulpif('*.css', minifyCss()))
		.pipe(assets.restore())
		.pipe(useref())
		.pipe(gulp.dest('dist'));
});

// copy deploy

gulp.task('copy', ['copyModernizr', 'copyImages', 'copyFonts'], function() {
	var files = ['app/*', 'app/.*'],
		excludes = ['!app/.editorconfig',
					'!app/.gitignore',
					'!app/.gitattributes',
					'!app/index.html'];
	return gulp
		.src(files.concat(excludes))
		.pipe(flatten())
		.pipe(gulp.dest('./dist'));
});

gulp.task('copyImages', function() {
	return gulp
		.src('app/img/*')
		.pipe(gulp.dest('./dist/img'));
});

gulp.task('copyFonts', function() {
	return gulp
		.src('app/fonts/*')
		.pipe(gulp.dest('./dist/fonts'));
});

gulp.task('copyModernizr', function() {
	return gulp
		.src('app/vendor/*')
		.pipe(gulp.dest('./dist/vendor'));
});

// wiredep

gulp.task('bower', function () {
	gulp.src('./app/*.html')
		.pipe(wiredep({
			directory: "app/components",
			exclude: ["app/components/jquery"]
		}))
	.pipe(gulp.dest('./app'));
});

// copy boilerplate

gulp.task('boilerplate', function() {
	gulp.src("I:/EveryD front-end/templates/html5-boilerplate_v5.0.0 (ed'd)/**")
	.pipe(gulp.dest("./"));
});

// sass

gulp.task('templates', function() {
	return gulp.src('./app/sass/templates/*.sass')
	.pipe(concat('templates.sass'))
	.pipe(gulp.dest('./app/sass'));
});

gulp.task('sass', ['templates'], function() {
	return sass('./app/sass/main.sass', { style: 'compressed' })
	.pipe(rename('bundle.min.css'))
	.pipe(gulp.dest('./app/css'))
});

// scripts

gulp.task('plugins', function() {
	return gulp.src('./app/js/plugins/*.js')
	.pipe(concat('plugins.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('./app/js'));
});

gulp.task('scripts', function() {
	return gulp.src('./app/js/main.js')
	.pipe(concat('main.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('./app/js'))
});
