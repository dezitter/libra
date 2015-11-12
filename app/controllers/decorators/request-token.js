export function requestToken(target, name, descriptor) {
    const handler = descriptor.value;

    descriptor.value = function(params, cb) {
        if (!this.app.get('hasToken')) {
            return cb(null, 'dropbox/request_token');
        }

        return handler.call(this, params, cb);
    };

    return descriptor;
}
