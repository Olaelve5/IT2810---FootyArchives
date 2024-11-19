import { ObjectId } from "mongodb";
import Result from "../../models/Result";
import Goalscorer from "../../models/Goalscorer";
import { Filters, SortInput } from "../../types/FiltersType";
import { QueryType } from "../../types/QueryType";

interface Args {
  filters?: Filters;
  sort?: SortInput;
  limit?: number;
  page?: number;
  _id?: string;
  teamName?: string;
  home_team?: string;
  away_team?: string;
  date?: Date;
}

interface PaginatedResults {
  results: any[];
  total: number;
  currentPage: number;
  totalPages: number;
}

// Resolvers for the GraphQL queries
const resultResolvers = {
  Query: {
    results: async (
      _: any,
      { filters, sort, limit = 20, page = 1 }: Args
    ): Promise<PaginatedResults> => {
      const query: QueryType = {};

      // Apply filters to the query
      if (filters) {
        if (filters.teams && filters.teams.length > 0) {
          if (!filters.exclusive) {
            query.$or = [
              { home_team: { $in: filters.teams } },
              { away_team: { $in: filters.teams } },
            ];
          } else {
            query.$and = [
              { home_team: { $in: filters.teams } },
              { away_team: { $in: filters.teams } },
            ];
          }
        }

        if (filters.tournaments && filters.tournaments.length > 0) {
          query.tournament = { $in: filters.tournaments };
        }

        // Filter by winning or losing team (if specified)
        if (filters.winningTeam) {
          query.$or = [
            {
              home_team: { $in: [filters.winningTeam] },
              $expr: { $gt: ["$home_score", "$away_score"] },
            } as any,
            {
              away_team: { $in: [filters.winningTeam] },
              $expr: { $gt: ["$away_score", "$home_score"] },
            } as any,
          ];
        }

        if (filters.losingTeam) {
          query.$or = [
            {
              home_team: { $in: [filters.losingTeam] },
              $expr: { $lt: ["$home_score", "$away_score"] },
            } as any,
            {
              away_team: { $in: [filters.losingTeam] },
              $expr: { $lt: ["$away_score", "$home_score"] },
            } as any,
          ];
        }
      }

      const skip = (page - 1) * limit;

      // Get paginated results without translations
      const basePipeline: any[] = [
        { $match: query },
        {
          $addFields: {
            goal_difference: {
              $abs: { $subtract: ["$home_score", "$away_score"] },
            },
            year: { $year: "$date" },
          },
        },
      ];

      if (filters?.yearRange) {
        basePipeline.push({
          $match: {
            $expr: {
              $and: [
                { $gte: [{ $year: "$date" }, filters.yearRange.startYear] },
                { $lte: [{ $year: "$date" }, filters.yearRange.endYear] },
              ],
            },
          },
        });
      }

      // Apply sorting logic based on the sort field
      if (sort) {
        basePipeline.push({
          $sort: { [sort.field]: sort.order },
        });
      }

      // Count total results for pagination
      const countPipeline = [...basePipeline, { $count: "total" }];
      const totalResult = await Result.aggregate(countPipeline).exec();
      const total = totalResult.length > 0 ? totalResult[0].total : 0;

      // Apply pagination
      basePipeline.push({ $skip: skip });
      basePipeline.push({ $limit: limit });

      const paginatedResults = await Result.aggregate(basePipeline).exec();

      // Add translations to the results
      const enrichedResultsPipeline: any[] = [
        {
          $match: {
            _id: { $in: paginatedResults.map((result: any) => result._id) },
          },
        },
        {
          $lookup: {
            from: "translations",
            localField: "home_team",
            foreignField: "_id",
            as: "home_translation",
          },
        },
        {
          $lookup: {
            from: "translations",
            localField: "away_team",
            foreignField: "_id",
            as: "away_translation",
          },
        },
        {
          $addFields: {
            home_team_no: {
              $arrayElemAt: ["$home_translation.No", 0],
            },
            away_team_no: {
              $arrayElemAt: ["$away_translation.No", 0],
            },
            goal_difference: {
              $abs: { $subtract: ["$home_score", "$away_score"] },
            },
          },
        },

        {
          // sort again after adding translations
          $sort: sort ? { [sort.field]: sort.order } : { _id: 1 }, // Default fallback sort
        },
      ];

      const enrichedResults = await Result.aggregate(
        enrichedResultsPipeline
      ).exec();

      return {
        results: enrichedResults,
        total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
      };
    },

    result: async (_: any, { _id }: Args) => {
      if (!_id) {
        throw new Error("ID is required");
      }

      const objectId = new ObjectId(_id);

      // Aggregate with translations
      const resultWithTranslation = await Result.aggregate([
        {
          $match: { _id: objectId },
        },
        {
          $lookup: {
            from: "translations",
            localField: "home_team",
            foreignField: "_id",
            as: "home_translation",
          },
        },
        {
          $lookup: {
            from: "translations",
            localField: "away_team",
            foreignField: "_id",
            as: "away_translation",
          },
        },
        {
          $addFields: {
            home_team_no: {
              $arrayElemAt: ["$home_translation.No", 0],
            },
            away_team_no: {
              $arrayElemAt: ["$away_translation.No", 0],
            },
          },
        },
      ]);

      if (!resultWithTranslation || resultWithTranslation.length === 0) {
        console.log("Result not found");
        throw new Error("Result not found");
      }

      return resultWithTranslation[0]; // Return the single result
    },
    goalscorers: async (_: any, { home_team, away_team, date }: Args) => {
      const goalscorers = await Goalscorer.find({
        home_team,
        away_team,
        date,
      });
      return goalscorers;

      [];
    },
  },
};

export default resultResolvers;
