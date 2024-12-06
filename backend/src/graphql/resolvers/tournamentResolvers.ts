import Result from '../../models/Result';
import { PipelineStage } from 'mongoose';

interface tournamentResolversI {
  tournamentName: string;
  page: number;
}

const LIMIT = 4; // Limit for pagination (tournaments per page)
const RESULT_LIMIT = 12; // Limit for results per tournament per year

const tournamentResolvers = {
  Query: {
    tournaments: async (_: any, { tournamentName, page }: tournamentResolversI) => {
      if (!tournamentName || page === undefined) {
        throw new Error('tournamentName and page are required parameters.');
      }

      const aggregationPipeline: PipelineStage[] = [
        {
          $match: {
            tournament: tournamentName,
          },
        },
        {
          $sort: { date: -1 },
        },
        {
          // Group by year and tournament
          $group: {
            _id: {
              year: { $year: '$date' },
              tournament: '$tournament',
            },
            // Push the results into an array
            results: {
              $push: {
                _id: '$_id',
                tournament: '$tournament',
                home_team: '$home_team',
                away_team: '$away_team',
                home_score: '$home_score',
                away_score: '$away_score',
                city: '$city',
                country: '$country',
                date: '$date',
              },
            },
          },
        },
        {
          // Project the fields to be returned in the results
          $project: {
            _id: {
              $concat: [{ $toString: '$_id.year' }, '_', '$_id.tournament'],
            },
            year: '$_id.year',
            tournament: '$_id.tournament',
            results: { $slice: ['$results', RESULT_LIMIT] }, // Fetch the last RESULT_LIMIT matches
          },
        },
        {
          $unwind: '$results', // Unwind results to join translations
        },
        {
          $lookup: {
            from: 'translations',
            localField: 'results.home_team',
            foreignField: '_id',
            as: 'home_translation',
          },
        },
        {
          $lookup: {
            from: 'translations',
            localField: 'results.away_team',
            foreignField: '_id',
            as: 'away_translation',
          },
        },
        {
          // Add the home and away team numbers and codes to the results
          $addFields: {
            'results.home_team_no': {
              $arrayElemAt: ['$home_translation.No', 0],
            },
            'results.away_team_no': {
              $arrayElemAt: ['$away_translation.No', 0],
            },
          },
        },
        {
          $group: {
            _id: '$_id',
            year: { $first: '$year' },
            tournament: { $first: '$tournament' },
            results: { $push: '$results' },
          },
        },
        {
          $sort: {
            _id: -1 as 1 | -1, // Sort by year in descending order
          },
        },
        {
          $facet: {
            paginatedResults: [
              { $skip: (page - 1) * LIMIT }, // Skip the first n tournament groups
              { $limit: LIMIT }, // Limit the number of tournament groups
            ],
            totalCount: [
              { $count: 'count' }, // Count the total number of tournament groups
            ],
            yearRange: [
              {
                $group: {
                  _id: null,
                  startYear: { $min: '$year' },
                  endYear: { $max: '$year' },
                },
              },
            ],
          },
        },
      ];

      const tournaments = await Result.aggregate(aggregationPipeline).exec();

      // Ensure that the paginatedResults and totalCount are always returned
      const paginatedResults = tournaments[0]?.paginatedResults || [];
      const totalCount = tournaments[0]?.totalCount?.[0]?.count || 0;

      // Get the start and end year of the tournaments
      const startYear = tournaments[0]?.yearRange?.[0]?.startYear || null;
      const endYear = tournaments[0]?.yearRange?.[0]?.endYear || null;

      return {
        paginatedResults,
        totalCount,
        startYear,
        endYear,
      };
    },
  },
};

export default tournamentResolvers;
