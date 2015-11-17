export function isLocked() {
    return this.lockedUntil != null
    &&     Date.now() < this.lockedUntil;
}
