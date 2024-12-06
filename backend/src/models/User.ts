import { model, Schema } from 'mongoose';

// Schema for the users collection in the MongoDB database
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
});

// Model for the users collection in the MongoDB database
const User = model('User', UserSchema, 'users');

export default User;
