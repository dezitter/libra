import User from 'app/server/models/user';

export function authenticate(req, res, next) {
    const { login, password } = req.body;

    User.authenticate(login, password, function(err) {
        if (err) return next(err);

        req.session.user = login;
        res.redirect('/');
    });
}
