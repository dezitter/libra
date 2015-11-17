import mongoose from 'mongoose';

import { preSaveHook } from './hooks/pre-save';
import { isLocked } from './virtuals/is-locked'; import { hasLockExpired } from './virtuals/has-lock-expired';
import { authenticate } from './statics/authenticate';
import { comparePassword } from './methods/compare-password';
import { incrementLoginAttempts } from './methods/increment-login-attempts';
import { resetAuthenticationAttempts } from './methods/reset-authentication-attempts';


const UserSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },

    lockedUntil: Number,
    loginAttempts: {
        type: Number,
        required: true,
        default: 0
    }
});

// pre/post hooks
UserSchema.pre('save', preSaveHook);

// virtuals
UserSchema.virtual('isLocked').get(isLocked);
UserSchema.virtual('hasLockExpired').get(hasLockExpired);

// static methods
UserSchema.statics.authenticate = authenticate;

// instance methods
UserSchema.methods.comparePassword = comparePassword;
UserSchema.methods.incLoginAttempts = incrementLoginAttempts;
UserSchema.methods.resetAuthAttempts = resetAuthenticationAttempts;

export default UserSchema;
