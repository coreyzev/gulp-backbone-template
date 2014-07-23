var gulp = require('gulp'),
    handlebars = require('gulp-handlebars'),
    defineModule = require('gulp-define-module'),
    declare = require('gulp-declare'),
    concat = require('gulp-concat');

gulp.task('templates', function() {
    gulp.src(['src/javascript/app/templates/*.hbs'])
        .pipe(handlebars())
        .pipe(defineModule('plain'))
        .pipe(declare({
            namespace: 'app.tmp'
        }))
        .pipe(concat('templates.js'))
        .pipe(gulp.dest('src/javascript/app/templates/'));
});