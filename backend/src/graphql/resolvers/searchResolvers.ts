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

      // Determine the field to search based on the language
      const translationField = language === "no" ? "No" : "_id";

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
            home_team_translated: { $arrayElemAt: [`$home_translation.${translationField}`, 0] },
            away_team_translated: { $arrayElemAt: [`$away_translation.${translationField}`, 0] },
          },
        },
        {
          $match: {
            $or: [
              { home_team_translated: { $regex: searchTerm, $options: "i" } },
              { away_team_translated: { $regex: searchTerm, $options: "i" } },
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
                    { $regexMatch: { input: "$home_team_translated", regex: searchTerm, options: "i" } },
                    { $regexMatch: { input: "$away_team_translated", regex: searchTerm, options: "i" } },
                  ],
                },
                {
                  type: "nation",
                  value: {
                    $cond: [
                      { $regexMatch: { input: "$home_team_translated", regex: searchTerm, options: "i" } },
                      "$home_team_translated",
                      "$away_team_translated",
                    ],
                  },
                },
                {
                  type: "tournament",
                  value: "$tournament",
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
            "_id.value": 1 as 1 | -1,
          },
        },
        {
            $limit: 8,
        }
      ];

      const results = await Result.aggregate(aggregationPipeline).exec();
      return results.map((result: any) => result._id); // Simplify the return format
    },
  },
};

export default searchResolvers;
