var gulp = require('gulp');

gulp.task('watch', ['setWatch', 'browserSync'], function() {
	gulp.watch('src/sass/**', ['compass']);
	gulp.watch('src/images/**', ['images']);
	gulp.watch('src/htdocs/**', ['copy']);
	//gulp.watch('node_modules/**', ['vendor']);
	//gulp.watch('src/javascript/vendor/**', ['vendor']);
	//gulp.watch('src/javascript/app/**', ['app']);
	//gulp.watch('src/javascript/app/templates/**', ['templates']);
	// Note: The browserify task handles js recompiling with watchify
});
