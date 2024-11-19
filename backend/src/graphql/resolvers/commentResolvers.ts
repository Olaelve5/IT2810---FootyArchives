import { get } from "http";
import Comment from "../../models/Comment";
import Result from "../../models/Result";

interface QueryArgs {
  result_id: string;
  limit?: number;
  page?: number;
}

interface MutationArgs {
  result_id: string;
  comment: string;
  user_name: string;
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
        .limit(limit);
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
      { result_id, comment, user_name }: MutationArgs
    ) => {
      const newComment = new Comment({
        date: new Date(),
        user_name: user_name,
        comment,
        result_id,
      });

      // Save the new comment to get its _id
      const savedComment = await newComment.save();

      // Update the Result document to include the new comment's _id
      await Result.updateOne(
        { _id: result_id },
        { $push: { comments: savedComment._id } }
      );

      return savedComment;
    },
  },
};

export default commentResolvers;
