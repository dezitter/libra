export default function initSession() {
    return function initSession(req, res, next) {
        const app = req.rendrApp;

        if (req.session.user) {
            app.set('sid', req.session.id);
        }

        if (req.session.token) {
            app.set('hasToken', true);
        }

        next();
    };
}
