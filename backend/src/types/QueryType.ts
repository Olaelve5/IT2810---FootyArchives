export type QueryType = {
  $or?: ({ home_team: { $in: string[] } } | { away_team: { $in: string[] } })[];
  year?: {
    $gte: number;
    $lte: number;
  };
  tournament?: { $in: string[] };
  date?: Date;
};
