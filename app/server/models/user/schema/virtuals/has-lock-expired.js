export function hasLockExpired() {
    return this.lockedUntil != null
    &&     this.lockedUntil < Date.now();
}
