var gulp = require('gulp');
var path = require('path');
var runSequence = require('run-sequence');
var watch = require('gulp-watch');
var webpack = require('gulp-webpack');
var shell = require('gulp-shell');
var rimraf = require('gulp-rimraf');

// cleanup
gulp.task('clean', function() {
	return gulp.src('./server/assets', {
			read: false
		})
		.pipe(rimraf());
});

// build
gulp.task('build', function() {
	gulp.src('./Client/html/index.html')
		.pipe(gulp.dest('./server/assets'));
	gulp.src('./Client/css/style.css')
		.pipe(gulp.dest('./server/assets/dist/'));
	return gulp.src('./Client/js/entry.js')
		.pipe(webpack({
			watch: false,
			output: {
				filename: 'bundle.js'
			},
			module: {
				loaders: [{
					test: /\.css$/,
					loader: 'style!css'
				}, {
					test: /\.js|jsx$/,
					loader: 'jsx?harmony'
				}]
			}
		}))
		.pipe(gulp.dest('./server/assets/dist/'));
});

// serve
gulp.task('serve', shell.task([
	'cd server && npm start && cd ..'
]));

gulp.task('rebuild', function() {
	runSequence('clean', 'build');
});

gulp.task('watch', function() {
	watch(['./Client/**/*'], function() {
		runSequence('clean', 'build');
	});
});

gulp.task('default', ['rebuild', 'serve']);