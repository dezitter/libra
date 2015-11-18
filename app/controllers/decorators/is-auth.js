// redirect to '/' if already authenticated
export function isAuth(target, name, descriptor) {
    const handler = descriptor.value;

    descriptor.value = function(params, cb) {
        if (this.app.get('sid')) {
            return this.redirectTo('/');
        }

        return handler.call(this, params, cb);
    };

    return descriptor;
}
