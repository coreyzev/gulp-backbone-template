var gulp = require('gulp'),
    fs = require('fs'),
    es = require('event-stream'),
    concat = require('gulp-concat'),
    handleErrors = require('../util/handleErrors');

/**
 * Build vendor, Concat and build our dependencies
 */
var packageJson = require('../../package.json');
var dependencies = Object.keys(packageJson.dependencies || {});
var addMore = [
    './src/javascript/vendor/jquery-plugin.js',
    './src/javascript/app/templates/templates.js'
];
for (var i = 0; i < addMore.length; i++) {
    var j = dependencies.length + 1 + i;
    dependencies[j] = addMore[i];
}

gulp.task('vendor', function() {

    return es.concat(
        gulp.src(dependencies)
        .on('error', handleErrors)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('./build/_r/'))
    );
});