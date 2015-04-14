var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var gulp = require('gulp');
var gutil = require('gulp-util');
var less = require('gulp-less');
var source = require('vinyl-source-stream');

gulp.task('default', ['watch', 'js', 'less']);

gulp.task('watch', function() {
    gulp.watch(['./src/js/**/*'], ['js']);
    gulp.watch(['./src/less/**/*'], ['less']);
});

gulp.task('js', function() {
    var b = browserify({
        entries: './src/js/index.js',
        debug: false
    });

    return b.bundle()
        .pipe(source('index.js'))
        .pipe(buffer())
        .on('error', gutil.log)
        .pipe(gulp.dest('./public/js/'));
});

gulp.task('less', function() {
    return gulp.src('./src/less/index.less')
        .pipe(less())
        .pipe(gulp.dest('./public/css'));
});
