import mongoose from 'mongoose';

import { authenticate } from './statics/authenticate';
import { comparePassword } from './methods/compare-password';
import { preSaveHook } from './hooks/pre-save';

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
    }
});

// pre/post hooks
UserSchema.pre('save', preSaveHook);

// static methods
UserSchema.statics.authenticate = authenticate;

// instance methods
UserSchema.methods.comparePassword = comparePassword;

export default UserSchema;
