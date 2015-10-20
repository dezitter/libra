import gulp from 'gulp';
import runSequence from 'run-sequence';

import './gulp/tasks/clean';
import './gulp/tasks/build';
import './gulp/tasks/watch';

gulp.task('clean', function(done) {
    runSequence('clean:templates', 'clean:css', 'clean:js', done);
});

gulp.task('build', function(done) {
    runSequence('clean', 'compile:templates', 'compile:css', 'compile:js', done);
});

gulp.task('watch', function(done) {
    runSequence('build', ['watch:css', 'watch:js', 'watch:server'], done);
});
