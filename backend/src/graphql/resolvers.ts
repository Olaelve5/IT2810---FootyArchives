import { ObjectId } from 'mongodb';
import Result from "../models/Result";

interface Args {
  amount?: number;
  _id?: string;
}

// Resolvers for the GraphQL queries
const resolvers = {
  Query: {
    results: async (_: any, { amount }: Args) => {
      const limit = amount || 10;
      return await Result.find().limit(limit);
    },
    result: async (_: any, { _id }: Args) => {
      if (!_id) {
        throw new Error("ID is required");
      }

      const objectId = new ObjectId(_id);
      const result = await Result.findOne({ _id: objectId });

      if (!result) {
        throw new Error("Result not found");
      }
      return result;
    },
  },
};

export default resolvers;
