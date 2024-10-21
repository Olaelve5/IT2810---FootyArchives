import { ObjectId } from "mongodb";
import Result from "../models/Result";
import { Filters, SortInput } from "../types/FiltersType";
import { QueryType } from "../types/QueryType";

interface Args {
  filters?: Filters;
  sort?: SortInput;
  limit?: number;
  page?: number;
  _id?: string;
  teamName?: string;
}

interface PaginatedResults {
  results: any[];
  total: number;
  currentPage: number;
  totalPages: number;
}

// Resolvers for the GraphQL queries
const resolvers = {
  Query: {
    // This resolver is used to get a list of results based on the filters, sort, limit, and page
    results: async (
      _: any,
      { filters, sort, limit = 20, page = 1 }: Args
    ): Promise<PaginatedResults> => {
      const query: QueryType = {};

      // Apply filters to the query
      if (filters) {
        // Filter by teams
        if (filters.teams && filters.teams.length > 0) {
          query.$or = [
            { home_team: { $in: filters.teams } },
            { away_team: { $in: filters.teams } },
          ];
        }

        // Filter by year range
        if (filters.yearRange) {
          query.year = {
            $gte: filters.yearRange.startYear,
            $lte: filters.yearRange.endYear,
          };
        }

        // Filter by tournament
        if (filters.tournaments && filters.tournaments.length > 0) {
          query.tournaments = { $in: filters.tournaments };
        }
      }

      // Sort the results
      const sortOptions: any = {};
      if (sort) {
        sortOptions[sort.field] = sort.order;
      }

      // Paginate the results
      const skip = (page - 1) * limit;

      const results = await Result.find(query)
        .sort(sortOptions)
        .skip(skip)
        .limit(limit)
        .exec();

      const total = await Result.countDocuments(query).exec();

      return {
        results,
        total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
      };
    },

    // This resolver is used to get a single result based on the ID
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

    // This resolver is used to search for teams based on the team name
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
  },
};

export default resolvers;
