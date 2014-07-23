var compass      = require('gulp-compass'),
    gulp         = require('gulp'),
    notify       = require('gulp-notify'),
    handleErrors = require('../util/handleErrors');

gulp.task('compass', function() {
	return gulp.src('./src/sass/*.scss')
		.pipe(compass({
			config_file: 'compass.rb',
			css: 'build/_r',
			sass: 'src/sass'
		}))
		.on('error', handleErrors);
});
