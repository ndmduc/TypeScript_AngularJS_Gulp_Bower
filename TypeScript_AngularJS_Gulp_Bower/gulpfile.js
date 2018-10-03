/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp');
var inject = require('gulp-inject');
var concat = require('gulp-concat');
var print = require('gulp-print');
var angularFilesort = require('gulp-angular-filesort');
var uglify = require('gulp-uglify');
var runSequence = require('run-sequence');

//gulp.task('css-task', function () {
//    var target = gulp.src('./Views/Home/Index.cshtml');

//    var customerCssStream = gulp.src(['./bower_components/bootstrap/dist/css/bootstrap.min.css',
//                                    './Styles/site.css'], { read: false });
//    //return target
//    //    .pipe(inject(customerCssStream.pipe(print())))
//    //    .pipe(concat('appStyles.css'))
//    //    .pipe(gulp.dest('.build/css'), { name: 'styles' })
//    //    .pipe(gulp.dest('./Views/Home'));
//    return target
//        .pipe(inject(
//            customerCssStream.pipe(print())
//            .pipe(concat('appStyles.css'))
//            .pipe(gulp.dest('.build/css')), { name: 'styles' })
//            )
//        .pipe(gulp.dest('./views/home/'));
//})
gulp.task('css-task', function () {
    var target = gulp.src('./views/home/index.cshtml');

    var customCssStream = gulp.src(['./bower_components/bootstrap/dist/css/bootstrap.min.css',
                                    './Styles/site.css'])
                            .pipe(concat('appStyles.css'))
                            .pipe(gulp.dest('./dist/css'));

    return target
        .pipe(inject(customCssStream.pipe(print()), { name: 'styles' }))
        .pipe(gulp.dest('./views/home/'));
});

gulp.task('vendors-task', function () {
    var target = gulp.src('./views/home/Index.cshtml');
    var vendorStream = gulp.src(['./bower_components/angular-route/angular-route.js',
                                './bower_components/angular/angular.js',
                                './bower_components/bootstrap/dist/js/bootstrap.js',
                                './bower_components/jquery/dist/jquery.js'])
                        .pipe(angularFilesort())
                        .pipe(concat('vendors.js'))
                        .pipe(gulp.dest('./dist/vendors'));
    return target
        .pipe(inject(vendorStream, { name: 'vendors' }))
        .pipe(gulp.dest('./views/home/'));
})

gulp.task('spa-task', function () {
    var target = gulp.src('./views/home/index.cshtml');
    var appDomainStream = gulp.src(['./app/domain/*.js'])
                            .pipe(print())
                            .pipe(concat('domain.js'))
                            .pipe(uglify())
                            .pipe(gulp.dest('./dist/spa'));
                            //.pipe(gulp.dest('./views/home/'));

    var appStream = gulp.src(['./app/*.js', './app/posts/*.js', './app/common/services/*.js'])
                            .pipe(print())
                            .pipe(concat('app.js'))
                            .pipe(uglify())
                            .pipe(gulp.dest('./dist/spa'));
                            //.pipe(gulp.dest('./views/home/'));

    return target
                .pipe(inject(appDomainStream, { name: 'domain' }))
                .pipe(inject(appStream, { name: 'app' }))
                .pipe(gulp.dest('./views/home/'));
})

gulp.task('default', function () {
    runSequence(['css-task', 'vendors-task', 'spa-task']);
})