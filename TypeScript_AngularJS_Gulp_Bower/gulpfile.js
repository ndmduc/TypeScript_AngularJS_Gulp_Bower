/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp');
var inject = require('gulp-inject');
var concat = require('gulp-concat');
var print = require('gulp-print');

gulp.task('css-task', function () {
    var target = gulp.src('./views/home/index.chtml');
    var customerCssStream = gulp.src(['./bower_components/bootstrap/dist/css/bootstrap.min.css',
                                    './Styles/site.css']);
    return target.pipe(inject(customerCssStream.pipe(print())
        .pipe(concat('appStyles.css'))
        .pipe(gulp.dest('.build/css')), { name: 'styles' })).pipe(gulp.dest('./views/home'));
})
//gulp.task('default', function () {
//    console.log("Hello Gulp!");
//});