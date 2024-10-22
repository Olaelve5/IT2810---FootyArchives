import { ObjectId } from "mongodb";
import Result from "../models/Result";
import { PipelineStage } from "mongoose";
import Goalscorer from "../models/Goalscorer";


interface Args {
  amount?: number;
  _id?: string;
  teamName?: string;
  home_team?: string;
  away_team?: string;
  date?: Date;
}

// Resolvers for the GraphQL queries
const resolvers = {
  Query: {
    // This resolver is used to get all results with an optional limit
    results: async (_: any, { amount }: Args) => {
      const limit = amount || 10;
      console.log("limit", limit);
      return await Result.find().limit(limit);
    },

    // This resolver is used to get a single result based on the ID
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

    // This resolver is used to search for teams
    searchTeams: async (_: any, { teamName }: Args) => {
      if (!teamName) {
        return [];
      }

      const pipeline: PipelineStage[] = [
        {
          $group: {
            _id: "$home_team", // Group by the home_team field
          },
        },
        {
          $match: {
            _id: {
              $regex: `^${teamName || ""}`, // Use ^ to match only at the start of the string
              $options: "i", // Case-insensitive match
            },
          },
        },
        {
          $sort: {
            _id: 1, // Sort the results alphabetically
          },
        },

        {
          $limit: 5, // Limit the results to 5
        },
      ];

      const teams = await Result.aggregate(pipeline).exec();
      return teams.map((team: any) => team._id); // Return only the team names
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
