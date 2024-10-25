import Result from "../../models/Result";

interface tournamentResolversI {
  tournamentName: string;
  page: number;
}

const LIMIT = 4;

const tournamentResolvers = {
  Query: {
    tournaments: async (_: any, {tournamentName, page}: tournamentResolversI) => {
      const aggregationPipeline = [
        {
          $match: {
            tournament: tournamentName,
          },
        },
        {
          $group: {
            _id: {
              year: {
                $year: "$date",
              },
              tournament: "$tournament",
            },
            results: {
              $push: {
                _id: "$_id",
                home_team: "$home_team",
                away_team: "$away_team",
                home_score: "$home_score",
                away_score: "$away_score",
                tournament: "$tournament",
                city: "$city",
                country: "$country",
                date: "$date",
              },
            },
          },
        },
        {
          $group: {
            _id: "$_id.year",
            // Group by year
            tournaments: {
              $push: {
                tournament: "$_id.tournament",
                results: "$results",
              },
            },
          },
        },
        {
          $sort: {
            _id: -1 as 1 | -1, // Sort by year
          },
        },
        {
          $skip: (page - 1) * LIMIT,
        },
        {
          $limit: LIMIT,
        },
      ];

      const tournaments = await Result.aggregate(aggregationPipeline).exec();

      // Ensure that the resolver returns an empty array if no results are found
      return tournaments.length > 0 ? tournaments : [];
    },
  },
};

export default tournamentResolvers;