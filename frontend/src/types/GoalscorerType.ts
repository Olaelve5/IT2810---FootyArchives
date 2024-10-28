export type Goalscorer = {
  _id: string;
  home_team: string;
  away_team: string;
  date: string;
  minute: number;
  own_goal: boolean;
  penalty: boolean;
  scorer: string;
  team: string;
}
