import { CommentType } from "../types/comment";


export const matchup = {
    home_team: 'Brazil',
    away_team: 'Norway',
    home_score: 1,
    away_score: 2,
    tournament: 'FIFA World Cup',
    date: '1998-06-23',
    city: 'Marsielle',
    country: 'France',
    goal_scorers_home: [{ name: 'Jose Oliveira', minute: 78, penalty: false, own_goal: false }],
    goal_scorers_away: [
      { name: 'Tore Andre Flo', minute: 83, penalty: false, own_goal: false },
      { name: 'Kjetil Rekdal', minute: 89, penalty: true, own_goal: false },
    ],
  };

  export const mockupComments: CommentType[] = [
    {
      username: 'john_doe',
      text: "Great match! The last-minute goal was incredible.",
      date: "2023-10-01T14:30:00Z",
      matchId: "match123"
    },
    {
      username: 'brainiac',
      text: "I can't believe the referee missed that foul.",
      date: "2023-10-02T16:45:00Z",
      matchId: "match124"
    },
    {
      username: '12keeper',
      text: "What a performance by the goalkeeper!",
      date: "2023-10-03T18:00:00Z",
      matchId: "match125"
    }
  ];