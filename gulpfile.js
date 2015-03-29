var browserify = require('browserify');
var gulp = require('gulp');
var less = require('gulp-less');
var transform = require('vinyl-transform');

gulp.task('default', ['watch', 'js', 'less']);

gulp.task('watch', function() {
    gulp.watch(['./src/js/**/*'], ['js']);
    gulp.watch(['./src/less/**/*'], ['less']);
});

gulp.task('js', function() {
    var browserified = transform(function(filename) {
        var b = browserify({
            entries: filename,
            debug: false
        });

        return b.bundle();
    });

    return gulp.src('./src/js/index.js')
        .pipe(browserified)
        .pipe(gulp.dest('./public/js/'));
});

gulp.task('less', function() {
    return gulp.src('./src/less/index.less')
        .pipe(less())
        .pipe(gulp.dest('./public/css'));
});
