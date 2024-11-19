import Result from "../../models/Result";
import Translation from "../../models/Translation";

interface SearchArgs {
  searchTerm: string;
  language: string;
}

const searchResolvers = {
  Query: {
    search: async (_: any, { searchTerm, language }: SearchArgs) => {
      if (!searchTerm || searchTerm.trim() === "") {
        throw new Error("Search term is required");
      }

      // Determine the fields to search based on language
      const translationField = language === "no" ? "No" : "_id";

      // Search for nations
      const nations = await Translation.aggregate([
        {
          $match: {
            [translationField]: { $regex: searchTerm, $options: "i" },
          },
        },
        {
          $project: {
            _id: 0,
            type: { $literal: "nation" },
            value: {
              en: { $ifNull: ["$_id", ""] },
              no: { $ifNull: ["$No", ""] },
            },
          },
        },
        { $limit: 5 },
      ]).exec();

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
                { $eq: [{ $indexOfCP: [{ $toLower: "$_id" }, searchTerm.toLowerCase()] }, 0] }, // Starts with searchTerm
                2,
                {
                  $cond: [
                    { $gte: [{ $indexOfCP: [{ $toLower: "$_id" }, searchTerm.toLowerCase()] }, 0] }, // Contains searchTerm
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
            matchScore: -1, // Sort by relevance score (best matches first)
            _id: 1,         // Secondary alphabetical sorting
          },
        },
        {
          $project: {
            _id: 0,
            type: { $literal: "tournament" },
            value: {
              en: "$_id",
              no: "$_id", // Assuming tournament names are the same in both languages
            },
          },
        },
        { $limit: 5 }, // Limit after sorting
      ]).exec();
      

      // Combine the results
      const combinedResults = [...nations, ...tournaments];

      return combinedResults;
    },

    searchMatchups: async (_: any, { searchTerm, language }: SearchArgs) => {
      if (!searchTerm || searchTerm.trim() === "") {
        throw new Error("Search term is required");
      }

      // Determine the fields to search based on language
      const homeField = language === "no" ? "home_team_no" : "home_team_en";
      const awayField = language === "no" ? "away_team_no" : "away_team_en";

      // Split searchTerm into individual words
      const searchTerms = searchTerm.split(/\s+/).filter(Boolean);

      // Separate year-like tokens and other tokens
      const yearTokens = searchTerms.filter((term) => /^\d{1,4}$/.test(term)); // Match 1–4 digit tokens
      const otherTokens = searchTerms.filter((term) => !/^\d{1,4}$/.test(term));

      const aggregationPipeline = [
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
            home_team_en: { $first: "$home_translation._id" },
            home_team_no: { $first: "$home_translation.No" },
            away_team_en: { $first: "$away_translation._id" },
            away_team_no: { $first: "$away_translation.No" },
            year: { $year: "$date" },
          },
        },
        {
          $match: {
            $and: [
              // Match year tokens if present
              ...(yearTokens.length
                ? [
                    {
                      $or: yearTokens.map((token) => ({
                        $expr: {
                          $regexMatch: {
                            input: { $toString: "$year" },
                            regex: token,
                            options: "i",
                          },
                        },
                      })),
                    },
                  ]
                : []),
              // Match other tokens
              {
                $or: otherTokens.map((term) => ({
                  $or: [
                    {
                      $and: [
                        { [homeField]: { $regex: term, $options: "i" } },
                        {
                          [awayField]: {
                            $regex: otherTokens
                              .filter((t) => t !== term)
                              .join("|"),
                            $options: "i",
                          },
                        },
                      ],
                    },
                    {
                      $and: [
                        { [awayField]: { $regex: term, $options: "i" } },
                        {
                          [homeField]: {
                            $regex: otherTokens
                              .filter((t) => t !== term)
                              .join("|"),
                            $options: "i",
                          },
                        },
                      ],
                    },
                  ],
                })),
              },
            ],
          },
        },
        {
          $project: {
            _id: 1,
            date: 1,
            tournament: 1,
            home_team_en: 1,
            home_team_no: 1,
            away_team_en: 1,
            away_team_no: 1,
            year: 1,
          },
        },
        {
          $sort: { date: -1 as 1 | -1 },
        },
      ];

      const results = await Result.aggregate(aggregationPipeline).exec();

      return results.map((match) => ({
        type: "matchup",
        value: {
          en: `${match.home_team_en} vs ${match.away_team_en}, ${match.year}`,
          no: `${match.home_team_no} vs ${match.away_team_no}, ${match.year}`,
        },
      }));
    },
  },
};

export default searchResolvers;
