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
        // Filter by teams
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

        // Filter by tournament
        if (filters.tournaments && filters.tournaments.length > 0) {
          query.tournament = { $in: filters.tournaments };
        }
      }

      // Filter by year range -> doesnt work yet!!
      if (filters?.yearRange) {
        query.date = {
          $gte: new Date(`${filters.yearRange.startYear}-01-01`),
          $lte: new Date(`${filters.yearRange.endYear}-12-31`),
        } as any;
      }

      const skip = (page - 1) * limit;

      // Build the aggregation pipeline
      const aggregationPipeline: any[] = [
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

      // Apply sorting logic based on the sort field
      if (sort) {
        if (sort.field === "goal_difference") {
          // Sort by goal difference if specified
          aggregationPipeline.push({
            $sort: { goal_difference: sort.order },
          });
        } else {
          // Sort by any other field
          aggregationPipeline.push({
            $sort: { [sort.field]: sort.order },
          });
        }
      }

      // Apply pagination
      aggregationPipeline.push({ $skip: skip });
      aggregationPipeline.push({ $limit: limit });

      const results = await Result.aggregate(aggregationPipeline).exec();
      const total = await Result.countDocuments(query).exec();

      return {
        results,
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
      const result = await Result.findOne({ _id: objectId })
        .populate({
          path: "comments",
          options: { sort: { date: -1 } },
        }) // Ensure comments are populated
        .exec();

      if (!result) {
        console.log("Result not found");
        throw new Error("Result not found");
      }
      return result;
    },

    searchTeams: async (_: any, { teamName }: { teamName: string }) => {
      if (!teamName) {
        return [];
      }

      // Get distinct teams from home_team and away_team
      const homeTeams = await Result.distinct("home_team", {
        home_team: { $regex: `^${teamName}`, $options: "i" },
      }).exec();

      const awayTeams = await Result.distinct("away_team", {
        away_team: { $regex: `^${teamName}`, $options: "i" },
      }).exec();

      // Combine both homeTeams and awayTeams, and filter out duplicates
      const allTeams = Array.from(new Set([...homeTeams, ...awayTeams]));

      // Sort the results alphabetically
      allTeams.sort((a, b) => a.localeCompare(b));

      // Limit the results to the first 5 unique teams
      return allTeams.slice(0, 5);
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
