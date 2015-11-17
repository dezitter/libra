import User from 'app/server/models/user';

export function signup(req, res, next) {
    User.create(req.body, function(err, user) {
        if (err) return next(err);

        req.session.user = user.login;
        res.redirect('/');
    });
}
