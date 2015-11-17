import bcrypt from 'bcrypt';

export function preSaveHook(next) {
    const user = this;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(onSaltGenerated);

    function onSaltGenerated(err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, onPasswordHashed);
    }

    function onPasswordHashed(err, hash) {
        if (err) return next(err);

        user.password = hash;
        next();
    }
}
