import Result from "../../models/Result";

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
            home_team_en: { $arrayElemAt: ["$home_translation._id", 0] },
            home_team_no: { $arrayElemAt: ["$home_translation.No", 0] },
            away_team_en: { $arrayElemAt: ["$away_translation._id", 0] },
            away_team_no: { $arrayElemAt: ["$away_translation.No", 0] },
          },
        },
        {
          $match: {
            $or: [
              {
                [`home_team_${language}`]: {
                  $regex: searchTerm,
                  $options: "i",
                },
              },
              {
                [`away_team_${language}`]: {
                  $regex: searchTerm,
                  $options: "i",
                },
              },
              { tournament: { $regex: searchTerm, $options: "i" } },
            ],
          },
        },
        {
          $project: {
            match: {
              $cond: [
                {
                  $or: [
                    {
                      $regexMatch: {
                        input: `$home_team_${language}`,
                        regex: searchTerm,
                        options: "i",
                      },
                    },
                    {
                      $regexMatch: {
                        input: `$away_team_${language}`,
                        regex: searchTerm,
                        options: "i",
                      },
                    },
                  ],
                },
                {
                  type: "nation",
                  value: {
                    en: {
                      $cond: [
                        {
                          $regexMatch: {
                            input: `$home_team_${language}`,
                            regex: searchTerm,
                            options: "i",
                          },
                        },
                        "$home_team_en",
                        "$away_team_en",
                      ],
                    },
                    no: {
                      $cond: [
                        {
                          $regexMatch: {
                            input: `$home_team_${language}`,
                            regex: searchTerm,
                            options: "i",
                          },
                        },
                        "$home_team_no",
                        "$away_team_no",
                      ],
                    },
                  },
                },
                {
                  type: "tournament",
                  value: {
                    en: "$tournament",
                    no: "$tournament", // Assuming tournament names are the same for now
                  },
                },
              ],
            },
          },
        },
        {
          $group: {
            _id: "$match",
          },
        },
        {
          $sort: {
            "_id.value.en": 1 as 1 | -1,
          },
        },
        {
          $limit: 8,
        },
      ];

      const results = await Result.aggregate(aggregationPipeline).exec();
      return results.map((result: any) => result._id); // Simplify the return format
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
                            $regex: otherTokens.filter((t) => t !== term).join("|"),
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
                            $regex: otherTokens.filter((t) => t !== term).join("|"),
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
