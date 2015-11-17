export function authenticate(login, password, cb) {
    this.findOne({ login }, onUserFound);

    function onUserFound(err, user) {
        if (err) return cb(err);
        if (!user) return cb(new Error('Login failed.'));

        user.comparePassword(password, onPasswordCompared);
    }

    function onPasswordCompared(err, isMatch) {
        if (err) { return cb(err); }
        if (!isMatch) return cb(new Error('Login failed'));

        cb(null);
    }
}
