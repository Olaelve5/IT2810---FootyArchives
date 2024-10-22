import { SortInput } from "../../types/FiltersType";
import NationStatModel from "../../models/NationStat";

const nationStatsResolvers = {
  Query: {
    nationStats: async (
      _: any,
      { limit, sort }: { limit: number; sort: SortInput }
    ) => {
      const sortOptions: any = {};
      if (sort) {
        sortOptions[sort.field] = sort.order;
      } else {
        sortOptions["total_team_games"] = -1;
      }

      const allNationStats = await NationStatModel.find()
        .sort(sortOptions)
        .limit(limit)
        .exec();

      return allNationStats;
    },

    nationStat: async (_: any, { _id }: { _id: string }) => {
      const nationStat = await NationStatModel.findById(_id).exec();
      return nationStat;
    },
  },
};

export default nationStatsResolvers;
