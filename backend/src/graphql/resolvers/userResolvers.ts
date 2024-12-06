import User from '../../models/User';

interface Args {
  _id: string;
}

const userResolvers = {
  Query: {
    getUserById: async (_: any, { _id }: Args) => {
      const user = await User.findById(_id);
      if (!user) throw new Error('User not found');

      return {
        id: user._id, // Map _id to id explicitly
        username: user.username,
      };
    },
  },
};

export default userResolvers;
