import { ObjectId } from 'mongodb';
import Result from "../models/Result";
import Goalscorer from "../models/Goalscorer";


interface Args {
  amount?: number;
  _id?: string;
  home_team?: string;
  away_team?: string;
  date?: Date;
}

// Resolvers for the GraphQL queries
const resolvers = {
  Query: {
    results: async (_: any, { amount }: Args) => {
      const limit = amount || 10;
      console.log("limit", limit);
      return await Result.find().limit(limit);
    },
    result: async (_: any, { _id }: Args) => {
      if (!_id) {
        throw new Error("ID is required");
      }

      const objectId = new ObjectId(_id);
      const result = await Result.findOne({ _id: objectId });

      if (!result) {
        console.log("Result not found");
        throw new Error("Result not found");
      }
      console.log(result);
      return result;
    },
    goalscorers: async (_: any, { home_team, away_team, date }: Args) => {
        console.log("Received variables:", { home_team, away_team, date });
         const goalscorers = await Goalscorer.find({
           home_team,
           away_team,
           date,
         });
         console.log("Fetched goalscorers:", goalscorers);
         return goalscorers;

      
      
      [
  
]

      
    }
  }
};

export default resolvers;
