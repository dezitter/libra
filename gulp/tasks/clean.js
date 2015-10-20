import del from 'del';
import gulp from 'gulp';

import paths from '../util/paths';

gulp.task('clean:css', function() {
    return del([paths.css_dest]);
});

gulp.task('clean:templates', function() {
    return del([paths.templates_dest]);
});

gulp.task('clean:js', function() {
    return del([paths.js_dest]);
});
