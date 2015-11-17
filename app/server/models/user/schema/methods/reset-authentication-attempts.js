export function resetAuthenticationAttempts(cb) {
    this.update({
        $set: { loginAttempts: 0 },
        $unset: { lockedUntil: 1 }
    }, cb);
}
