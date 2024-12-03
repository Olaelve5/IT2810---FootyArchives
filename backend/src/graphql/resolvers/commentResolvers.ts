import { get } from "http";
import Comment from "../../models/Comment";
import Result from "../../models/Result";
import User from "../../models/User";

interface QueryArgs {
  result_id: string;
  limit?: number;
  page?: number;
}

interface MutationArgs {
  result_id: string;
  comment: string;
  user_id: string;
  username: string;
}

// Resolvers for the GraphQL queries and mutations related to comments
const commentResolvers = {
  Query: {
    // Get the comments for a result
    getComments: async (
      _: any,
      { result_id, limit = 10, page = 1 }: QueryArgs
    ) => {
      const count = await Comment.countDocuments({ result_id });
      const totalPages = Math.ceil(count / limit);
      const skip = (page - 1) * limit;
      const comments = await Comment.find({ result_id })
        .sort({ date: -1 })
        .skip(skip)
        .limit(limit)
        .populate("user_id", "username");

      return {
        comments,
        totalCount: count,
        totalPages,
      };
    },
  },

  Mutation: {
    // Add a new comment to a result
    addComment: async (
      _: any,
      { result_id, comment, user_id, username }: MutationArgs
    ) => {
      // Ensure the user exists in the `users` collection
      let user = await User.findById(user_id);

      if (!user) {
        // If the user doesn't exist, create a new one
        user = await User.create({
          _id: user_id, // Use the provided user_id
          username, // Save the username for this user
        });
      }

      // Create a new comment
      const newComment = new Comment({
        date: new Date(),
        user_id: user._id,
        comment,
        result_id,
      });

      // Save the new comment
      const savedComment = await newComment.save();

      return savedComment;
    },
  },
};

export default commentResolvers;
