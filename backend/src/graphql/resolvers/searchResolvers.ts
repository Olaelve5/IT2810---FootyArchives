import Result from "../../models/Result";
import Translation from "../../models/Translation";

interface SearchArgs {
  searchTerm: string;
  language: string;
  limit?: number;
}

const searchResolvers = {
  Query: {
    search: async (_: any, { searchTerm, language, limit = 5 }: SearchArgs) => {
      if (!searchTerm || searchTerm.trim() === "") {
        throw new Error("Search term is required");
      }

      // Determine the fields to search based on language
      const translationField = language === "no" ? "No" : "_id";

      // Search for nations with sorting
      const nations = await Translation.aggregate([
        {
          $match: {
            [translationField]: { $regex: searchTerm, $options: "i" },
          },
        },
        {
          $addFields: {
            matchScore: {
              $cond: [
                {
                  $eq: [
                    {
                      $indexOfCP: [
                        { $toLower: `$${translationField}` },
                        searchTerm.toLowerCase(),
                      ],
                    },
                    0,
                  ],
                }, // Starts with searchTerm
                2,
                {
                  $cond: [
                    {
                      $gte: [
                        {
                          $indexOfCP: [
                            { $toLower: `$${translationField}` },
                            searchTerm.toLowerCase(),
                          ],
                        },
                        0,
                      ],
                    }, // Contains searchTerm
                    1,
                    0,
                  ],
                },
              ],
            },
          },
        },
        {
          $sort: {
            matchScore: -1, // Sort by relevance score
            [translationField]: 1, // Secondary alphabetical sorting
          },
        },
        {
          $project: {
            _id: 0,
            en: { $ifNull: ["$_id", ""] },
            no: { $ifNull: ["$No", ""] },
          },
        },
        { $limit: limit },
      ]).exec();

      // Search for tournaments with sorting
      const tournaments = await Result.aggregate([
        {
          $match: {
            tournament: { $regex: searchTerm, $options: "i" },
          },
        },
        {
          $group: {
            _id: "$tournament",
          },
        },
        {
          $addFields: {
            matchScore: {
              $cond: [
                {
                  $eq: [
                    {
                      $indexOfCP: [
                        { $toLower: "$_id" },
                        searchTerm.toLowerCase(),
                      ],
                    },
                    0,
                  ],
                }, // Starts with searchTerm
                2,
                {
                  $cond: [
                    {
                      $gte: [
                        {
                          $indexOfCP: [
                            { $toLower: "$_id" },
                            searchTerm.toLowerCase(),
                          ],
                        },
                        0,
                      ],
                    }, // Contains searchTerm
                    1,
                    0,
                  ],
                },
              ],
            },
          },
        },
        {
          $sort: {
            matchScore: -1, // Sort by relevance score
            _id: 1, // Secondary alphabetical sorting
          },
        },
        {
          $project: {
            _id: 0,
            en: "$_id",
            no: "$_id",
          },
        },
        { $limit: limit }, // Limit after sorting
      ]).exec();

      // Return results in the desired format
      return {
        nations: nations.map((nation) => ({ en: nation.en, no: nation.no })),
        tournaments: tournaments.map((tournament) => ({
          en: tournament.en,
          no: tournament.no,
        })),
      };
    },
  },
};

export default searchResolvers;
