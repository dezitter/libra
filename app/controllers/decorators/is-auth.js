export function isAuth(target, name, descriptor) {
    const handler = descriptor.value;

    descriptor.value = function(params, cb) {
        if (!this.app.get('sid')) {
            return this.redirectTo('/login');
        }

        return handler.call(this, params, cb);
    };

    return descriptor;
}
