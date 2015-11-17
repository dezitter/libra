import mongoose from 'mongoose';
import UserSchema from './schema';

export default mongoose.model('User', UserSchema);
