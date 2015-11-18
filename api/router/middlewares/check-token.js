export function checkTokenMiddleware() {
    return function(req, res, next) {
        if (!req.session.token) {
            return next(new Error('Missing token'));
        }

        next();
    };
}
