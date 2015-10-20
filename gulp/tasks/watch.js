import gutil from 'gulp-util';
import gulp from 'gulp';
import nodemon from 'gulp-nodemon';
import watchify from 'watchify';

import paths from '../util/paths';
import { createBundle, writeBundle } from '../util';

gulp.task('watch:css', function() {
    gulp.watch(paths.css_src, ['compile:css']);
});

gulp.task('watch:js', function() {
    const options = Object.assign({ debug: true }, watchify.args);
    const bundle = createBundle(paths.js_src, options);
    const watcher = watchify(bundle);

    watcher.on('log', gutil.log)
           .on('update', () => writeBundle(watcher));

    return writeBundle(watcher);
});

gulp.task('watch:server', function() {
    nodemon({
        delay: 500,
        tasks: ['compile:templates']
    });
});
