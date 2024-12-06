import NationStatModel from '../../models/NationStat';
import { SortInput } from '../../types/FiltersType';

const nationStatsResolvers = {
  Query: {
    nationStats: async (_: any, { limit, sort }: { limit: number; sort: SortInput }) => {
      const sortOptions: any = {};
      if (sort) {
        sortOptions[sort.field] = sort.order;
      } else {
        sortOptions['total_team_games'] = -1;
      }

      // Aggregation pipeline
      const nationStats = await NationStatModel.aggregate([
        {
          $sort: sortOptions, // Sort based on input or default by total_team_games
        },
        {
          $limit: limit, // Limit results to the requested number
        },
        {
          $lookup: {
            from: 'translations', // Join with translations collection
            localField: '_id',
            foreignField: '_id',
            as: 'translation',
          },
        },
        {
          $addFields: {
            name_no: { $arrayElemAt: ['$translation.No', 0] }, // Extract Norwegian name
            code: { $arrayElemAt: ['$translation.Code', 0] }, // Extract Code
          },
        },
        {
          $lookup: {
            from: 'translations', // Join translations for TopRival
            localField: 'top_rival.opponent',
            foreignField: '_id',
            as: 'rival_translation',
          },
        },
        {
          $addFields: {
            'top_rival.name_no': { $arrayElemAt: ['$rival_translation.No', 0] }, // Add Norwegian name for TopRival
            'top_rival.code': { $arrayElemAt: ['$rival_translation.Code', 0] }, // Add Code for TopRival
          },
        },
      ]);

      return nationStats;
    },

    nationStat: async (_: any, { _id }: { _id: string }) => {
      const nationStatWithTranslation = await NationStatModel.aggregate([
        {
          $match: { _id: _id }, // Match by ID
        },
        {
          $lookup: {
            from: 'translations', // Join with translations collection
            localField: '_id',
            foreignField: '_id',
            as: 'translation',
          },
        },
        {
          $addFields: {
            name_no: { $arrayElemAt: ['$translation.No', 0] }, // Extract Norwegian name
            code: { $arrayElemAt: ['$translation.Code', 0] }, // Extract Code
          },
        },
        {
          $lookup: {
            from: 'translations', // Join translations for TopRival
            localField: 'top_rival.opponent',
            foreignField: '_id',
            as: 'rival_translation',
          },
        },
        {
          $addFields: {
            'top_rival.name_no': { $arrayElemAt: ['$rival_translation.No', 0] }, // Add Norwegian name for TopRival
            'top_rival.code': { $arrayElemAt: ['$rival_translation.Code', 0] }, // Add Code for TopRival
          },
        },
      ]);

      if (!nationStatWithTranslation || nationStatWithTranslation.length === 0) {
        throw new Error('NationStat not found');
      }

      return nationStatWithTranslation[0]; // Return the single document
    },
  },
};

export default nationStatsResolvers;
