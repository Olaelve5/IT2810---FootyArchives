import Comment from "../../models/Comment";

interface Args {
  result_id: string;
  comment: string;
  user_name: string;
}

const commentResolvers = {
  Mutation: {
    addComment: async (_: any, { result_id, comment, user_name }: Args) => {
      const newComment = new Comment({
        date: new Date(),
        user_name: user_name,
        comment,
        result_id,
      });
      return newComment.save();
    },
  },
};

export default commentResolvers;
