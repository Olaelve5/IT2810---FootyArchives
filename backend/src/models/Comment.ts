import { ObjectId } from "mongodb";
import { model, Schema } from "mongoose";

// Scheme for the comments collection in the MongoDB database
const CommentSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  user_name: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  result_id: {
    type: ObjectId,
    required: true,
  },
});

// Model for the comments collection in the MongoDB database
const Comment = model("Comment", CommentSchema, "comments");

export default Comment;
