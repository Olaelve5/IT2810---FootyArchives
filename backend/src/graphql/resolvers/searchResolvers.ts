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

      const matchField = language === "no" ? "No" : "_id";

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
              { [`home_team_${language}`]: { $regex: searchTerm, $options: "i" } },
              { [`away_team_${language}`]: { $regex: searchTerm, $options: "i" } },
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
                    { $regexMatch: { input: `$home_team_${language}`, regex: searchTerm, options: "i" } },
                    { $regexMatch: { input: `$away_team_${language}`, regex: searchTerm, options: "i" } },
                  ],
                },
                {
                  type: "nation",
                  value: {
                    en: {
                      $cond: [
                        { $regexMatch: { input: `$home_team_${language}`, regex: searchTerm, options: "i" } },
                        "$home_team_en",
                        "$away_team_en",
                      ],
                    },
                    no: {
                      $cond: [
                        { $regexMatch: { input: `$home_team_${language}`, regex: searchTerm, options: "i" } },
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
  },
};

export default searchResolvers;
