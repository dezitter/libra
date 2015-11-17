export function authenticate(login, password, cb) {
    this.findOne({ login }, onUserFound);

    function onUserFound(err, user) {
        if (err) return cb(err);
        if (!user) return cb(new Error('Login failed.'));

        if (user.isLocked) {
            user.incLoginAttempts(err => {
                if (err) return cb(err);

                cb(new Error('Max logging attempts reached'));
            });
        } else {
            user.comparePassword(password, (err, isMatch) => {
                onPasswordCompared(err, isMatch, user);
            });
        }
    }

    function onPasswordCompared(err, isMatch, user) {
        if (err) return cb(err);

        if (!isMatch) {
            user.incLoginAttempts(err => {
                if (err) return cb(err);

                cb(new Error('Login failed'));
            });
        } else {
            user.resetAuthAttempts(err => {
                if (err) return cb(err);

                cb(null, user);
            });
        }
    }
}
