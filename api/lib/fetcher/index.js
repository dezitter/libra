import { stampFile } from './util/stamp-file';
import { stampFiles } from './util/stamp-files';

const DEFAULT_EXPIRE_DELAY = 3600;

class Fetcher {

    constructor(options) {
        this.cache = options.db.collection('cache');
        this.dropbox = options.dropbox;

        // automatically bust cache
        this.cache.createIndex(
            { 'cachedAt': 1 },
            { expireAfterSeconds : options.ttl || DEFAULT_EXPIRE_DELAY }
        );
    }

    _cacheAllFiles(files) {
        this.cache.insert(files);
        return files;
    }

    _cacheOneFile(file) {
        this.cache.update({ path: file.path }, file);
        return file;
    }

    fetch(options) {
        return this.cache.find()
            .toArray()
            .then(files => {
                if (files.length === 0) {
                    return this.dropbox.search(options)
                                       .then(stampFiles)
                                       .then(this._cacheAllFiles.bind(this));
                }

                return files;
            });
    }

    find(options) {
        return this.cache.findOne({ path: options.args.filepath })
            .then(file => {
                if (!file || !file.content) {
                    return this.dropbox.readFile(options)
                                       .then(stampFile)
                                       .then(this._cacheOneFile.bind(this));
                }

                return file;
            });
    }
}

export default Fetcher;
