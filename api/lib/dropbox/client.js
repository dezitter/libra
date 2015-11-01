import Dropbox from 'dropbox';

import { getSpecs } from 'api/lib/dropbox/specs';
import { getResponse, parseStat, parseFile } from 'api/lib/dropbox/util';

// Promise wrapper for the Dropbox client API
class Client {

    constructor(options) {
        this.client = new Dropbox.Client(options);
    }

    // call the given dropbox method and wrap it in a promise
    _request(options) {
        const { token, method, args, responseParams} = options;

        this.client.setCredentials({ token });

        return new Promise((resolve, reject) => {
            this.client[method](...args, (error, ...results) => {
                if (error) return reject(error);

                resolve( getResponse(responseParams, ...results) );
            });
        });
    }

    search(options) {
        Object.assign(options, getSpecs('search'), {
            args: [options.args.root, options.args.pattern]
        });

        return this._request(options)
            .then(result => result.stats.map(parseStat));
    }

    readFile(options) {
        Object.assign(options, getSpecs('readFile'), {
            args: [options.args.filepath]
        });

        return this._request(options)
            .then(result => parseFile(result));
    }
}

export default Client;
