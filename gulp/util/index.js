import path from 'path';

// set 'name' property on vinyl files, with extension removed
function setFilenameProp(file, cb) {
    const ext = path.extname(file.relative);
    file.name = file.relative.replace(ext, '');
    cb(null, file);
}

export { setFilenameProp };
export { createBundle, writeBundle } from './browserify';
