import { ObjectId } from 'mongodb';
import { model, Schema } from 'mongoose';

// Schema for the comments collection in the MongoDB database
const CommentSchema = new Schema({
  user: {
    type: ObjectId,
    required: true,
    ref: 'User', // Reference to the User model
  },
  date: {
    type: Date,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  result_id: {
    type: ObjectId,
    required: true,
    ref: 'Result', // Reference to the Result model
  },
});

// Model for the comments collection in the MongoDB database
const Comment = model('Comment', CommentSchema, 'comments');

export default Comment;
