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
            _id: {
              $concat: [{ $toString: "$_id.year" }, "_", "$_id.tournament"],
            },
            year: "$_id.year",
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
          $facet: {
            paginatedResults: [
              { $skip: (page - 1) * LIMIT }, // Skip the first n tournament groups
              { $limit: LIMIT }, // Limit the number of tournament groups
            ],
            totalCount: [
              { $count: "count" }, // Count the total number of tournament groups
            ],
          },
        },
      ];

      const tournaments = await Result.aggregate(aggregationPipeline).exec();

      // Ensure that the paginatedResults and totalCount are always returned
      const paginatedResults = tournaments[0]?.paginatedResults || [];
      const totalCount = tournaments[0]?.totalCount?.[0]?.count || 0;

      return {
        paginatedResults,
        totalCount,
      };
    },
  },
};

export default tournamentResolvers;
