import browserify from 'browserify';
import glob from 'glob';
import gulp from 'gulp';
import gutil from 'gulp-util';
import path from 'path';
import source from 'vinyl-source-stream';

import paths from './paths';

function createBundle(files, options={}) {
    const aliases = getBundleAliases();

    return browserify(files, options)
        .require(aliases);
}

function getBundleAliases() {
    const aliases = glob.sync('./app/**/*.js')
                        .map(file => exposeFile(file));

    const extAliases = [{
        file: './node_modules/handlebars/runtime.js',
        expose: 'handlebars'
    },{
        file: './node_modules/rendr-handlebars/index.js',
        expose: 'rendr-handlebars'
    }];

    return aliases.concat(extAliases);
}

// './app/file.js' => 'app/file'
function exposeFile(filepath) {
    const expose = filepath.replace(/\.\//, '')
                           .replace(/.js$/, '');
    return {
        expose,
        file: filepath
    };
}

function writeBundle(b) {
    const dest_file = path.basename(paths.js_dest);
    const dest_dir  = path.dirname(paths.js_dest);

    return b
        .bundle().on('error', onBundleError)
        .pipe(source(dest_file))
        .pipe(gulp.dest(dest_dir));
}

function onBundleError(error) {
    gutil.log(
        gutil.colors.red.bold('Browserify:'),
        gutil.colors.red(error.message)
    );
    gutil.log(error.stack);
}

export { createBundle, writeBundle };
