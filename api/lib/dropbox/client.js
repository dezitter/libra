import Dropbox from 'dropbox';

import { getResponse, parseStat, parseFile } from 'api/lib/dropbox/util';

// Promise wrapper for the Dropbox client API
class Client {

    constructor(options) {
        this.client = new Dropbox.Client(options);
    }

    // call the given dropbox method and wrap it in a promise
    _request(method, params, ...rest) {
        return new Promise((resolve, reject) => {
            this.client[method](...rest, (error, ...results) => {
                if (error) return reject(error);

                resolve( getResponse(params, ...results) );
            });
        });
    }

    authenticate() {
        return this._request('authenticate', ['client']);
    }

    search(root, pattern) {
        return this._request('search', ['stats'], root, pattern)
            .then(result => result.stats.map(parseStat));
    }

    readFile(path) {
        return this._request('readFile', ['content', 'stat', 'info'], path)
            .then(result => parseFile(result));
    }
}

export default Client;
