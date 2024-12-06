import Comment from '../../models/Comment';
import User from '../../models/User';

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
    getComments: async (_: any, { result_id, limit = 10, page = 1 }: QueryArgs) => {
      const count = await Comment.countDocuments({ result_id });
      const totalPages = Math.ceil(count / limit);
      const skip = (page - 1) * limit;
      const comments = await Comment.find({ result_id })
        .sort({ date: -1 })
        .skip(skip)
        .limit(limit)
        .populate('user', 'username');

      return {
        comments,
        totalCount: count,
        totalPages,
      };
    },
  },

  Mutation: {
    // Add a new comment to a result
    addComment: async (_: any, { result_id, comment, user_id, username }: MutationArgs) => {
      try {
        let user;

        if (user_id) {
          // Find the user by provided user_id
          user = await User.findById(user_id);

          if (!user) {
            throw new Error('User not found');
          }
        } else {
          // No user_id provided; create a new user
          user = await User.create({ username });
        }

        // Create a new comment
        const newComment = new Comment({
          date: new Date(),
          user: user._id, // Store only the ObjectId reference
          comment,
          result_id,
        });

        // Save the new comment
        const savedComment = await newComment.save();

        // Populate the user field before returning
        const populatedComment = await savedComment.populate('user', 'username');

        return populatedComment;
      } catch (error) {
        if (error instanceof Error && error.message.includes('E11000') && error.message.includes('username')) {
          throw new Error('The username is already taken');
        }

        console.error('Error adding comment:', error);
        throw new Error('Failed to add comment');
      }
    },

    // Edit a comment
    editComment: async (_: any, { comment_id, comment }: { comment_id: string; comment: string }) => {
      try {
        const updatedComment = await Comment.findByIdAndUpdate(comment_id, { comment }, { new: true }).populate(
          'user',
          'username',
        );

        if (!updatedComment) {
          throw new Error('Comment not found');
        }

        return updatedComment;
      } catch (error) {
        console.error('Error editing comment:', error);
        throw new Error('Failed to edit comment');
      }
    },

    // Delete a comment
    deleteComment: async (_: any, { comment_id }: { comment_id: string }) => {
      try {
        const comment = await Comment.findById(comment_id);

        if (!comment) {
          throw new Error('Comment not found');
        }

        await comment.deleteOne();
        return true;
      } catch (error) {
        console.error('Error deleting comment:', error);
        throw new Error('Failed to delete comment');
      }
    },
  },
};

export default commentResolvers;
