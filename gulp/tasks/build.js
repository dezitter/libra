import concat from 'gulp-concat';
import gulp from 'gulp';
import handlebars from 'gulp-handlebars';
import mapStream from 'map-stream';
import path from 'path';
import sass from 'gulp-sass';
import wrap from 'gulp-wrap';

import paths from '../util/paths';
import { moduleWrap, templateWrap } from '../util/wrap';
import { createBundle, writeBundle, setFilenameProp } from '../util';

gulp.task('compile:templates', function() {
    const dest_file = path.basename(paths.templates_dest);
    const dest_dir  = path.dirname(paths.templates_dest);

    return gulp.src([paths.templates_src, paths.templates_src_ignore])
                .pipe(handlebars())
                .pipe(mapStream(setFilenameProp))
                .pipe(wrap(templateWrap))
                .pipe(concat(dest_file))
                .pipe(wrap(moduleWrap))
                .pipe(gulp.dest(dest_dir));
});

gulp.task('compile:css', function() {
    return gulp.src(paths.css_src)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(paths.css_dest));
});

gulp.task('compile:js', function() {
    const b = createBundle(paths.js_src);
    return writeBundle(b);
});
