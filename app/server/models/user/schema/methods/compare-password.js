import bcrypt from 'bcrypt';

export function comparePassword(password, cb) {
    const user = this;

    bcrypt.compare(password, user.password, onPasswordCompared);

    function onPasswordCompared(err, same) {
        if (err) return cb(err);

        cb(null, same);
    }
}
