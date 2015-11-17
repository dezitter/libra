const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_TIME = 2 * 60 * 60 * 1000; // ms

export function incrementLoginAttempts(cb) {
    let update = {};

    if (this.hasLockExpired) {
        update = {
            $set: { loginAttempts: 1 },
            $unset: { lockedUntil: 0 }
        };
    } else {
        const isMaxAttemptsReached = this.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS;

        update = { $inc : { loginAttempts: 1 } };

        if (!this.isLocked && isMaxAttemptsReached) {
            update['$set'] = { lockedUntil: Date.now() + LOCK_TIME };
        }
    }

    return this.update(update, cb);
}
