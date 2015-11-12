import UserModel from 'app/models/user';

export function authenticate(req, res, next) {
    const { login, password } = req.body;

    UserModel.authenticate(login, password)
             .then(user => {
                 req.session.user = user;
                 res.redirect('/');
             })
             .catch(next);
}
