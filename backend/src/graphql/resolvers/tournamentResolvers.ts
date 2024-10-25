import Result from "../../models/Result";

const tournamentResolvers = {
  Query: {
    tournaments: async (_: any, tournamentName: string) => {
      const aggregationPipeline = [
        {
          $match: {
            tournament: "FIFA World Cup",
          },
        },
        {
          $group: {
            _id: {
              year: { $year: "$date" },
              tournament: "$tournament",
            },
            results: {
              $push: {
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
          $group: {
            _id: "$_id.year", // Group by year
            tournament: { $first: "$_id.tournament" },
            results: { $first: "$results" }, // Keep only the array of results
          },
        },
        {
          $sort: {
            _id: 1 as 1 | -1, // Sort by year
          },
        },
      ];

      const tournaments = await Result.aggregate(aggregationPipeline).exec();

      return tournaments;
    },
  },
};

export default tournamentResolvers;
