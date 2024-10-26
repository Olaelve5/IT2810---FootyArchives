import Result from "../../models/Result";
import { PipelineStage } from "mongoose";

interface tournamentResolversI {
  tournamentName: string;
  page: number;
}

const LIMIT = 4; // Limit for pagination (tournaments per page)
const RESULT_LIMIT = 12; // Limit for results per tournament per year

const tournamentResolvers = {
  Query: {
    tournaments: async (
      _: any,
      { tournamentName, page }: tournamentResolversI
    ) => {
      if (!tournamentName || page === undefined) {
        throw new Error("tournamentName and page are required parameters.");
      }
      
      const aggregationPipeline: PipelineStage[] = [
        {
          $match: {
            tournament: tournamentName,
          },
        },
        {
          $sort: { date: -1 },
        },
        {
          $group: {
            _id: {
              year: { $year: "$date" },
              tournament: "$tournament",
            },
            results: {
              $push: {
                _id: "$_id",
                tournament: "$tournament",
                home_team: "$home_team",
                away_team: "$away_team",
                home_score: "$home_score",
                away_score: "$away_score",
                city: "$city",
                country: "$country",
                date: "$date",
              },
            },
          },
        },
        {
          $project: {
            _id: "$_id.year",
            tournament: "$_id.tournament",
            results: { $slice: ["$results", RESULT_LIMIT] }, // Fetch the last 5 matches after sorting
          },
        },
        {
          $sort: {
            _id: -1 as 1 | -1, // Sort by year in descending order
          },
        },
        {
          $skip: (page - 1) * LIMIT,
        },
        {
          $limit: LIMIT,
        },
      ];

      const tournaments = await Result.aggregate(aggregationPipeline).exec();

      return tournaments.length > 0 ? tournaments : [];
    },
  },
};

export default tournamentResolvers;
