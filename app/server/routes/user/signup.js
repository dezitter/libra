import UserModel from 'app/models/user';

export function signup(req, res) {
    const { login, email, password } = req.body;

    // TODO create & save
    const user = new UserModel({ login, email, password });
    req.session.user = user;
    res.redirect('/');
}
