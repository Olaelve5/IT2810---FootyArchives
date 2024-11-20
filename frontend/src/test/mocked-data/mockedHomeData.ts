import { GET_NATION_STATS } from '../../graphql/nationStatsOperations';
import { GET_RESULTS } from '../../graphql/resultOperations';
import { SEARCH } from '../../graphql/searchOperations';
import { MockedResponse } from '@apollo/client/testing';

export const mockHomeData: MockedResponse[] = [
  {
    request: {
      query: GET_NATION_STATS,
      variables: { limit: 12, sort: { field: 'total_team_wins', order: -1 } },
    },
    result: {
      data: {
        nationStats: [
          {
            _id: '1',
            name_no: 'Norge',
            code: 'NOR',
            total_team_games: 100,
            total_team_wins: 60,
            total_team_draws: 20,
            total_team_losses: 20,
            total_team_goals_scored: 200,
            total_team_goals_conceded: 100,
            top_rival: {
              opponent: 'Sverige',
              name_no: 'Sverige',
              code: 'SWE',
              total_games: 50,
              total_wins: 25,
              total_draws: 15,
              total_losses: 10,
              total_goals_scored: 75,
              total_goals_conceded: 50,
            },
          },
        ],
      },
    },
  },
  {
    request: {
      query: GET_RESULTS,
      variables: { limit: 12, sort: { field: 'date', order: -1 } },
    },
    result: {
      data: {
        results: {
          results: [
            {
              _id: '1',
              date: '2022-06-01',
              home_team: 'Team A',
              away_team: 'Team B',
              home_score: 3,
              away_score: 2,
              tournament: 'UEFA Nations League',
              city: 'City A',
              country: 'Country A',
              neutral: false,
              home_team_no: 'Lag A',
              away_team_no: 'Lag B',
            },
          ],
          total: 1,
          currentPage: 1,
          totalPages: 1,
        },
      },
    },
  },
  {
    request: {
      query: GET_RESULTS,
      variables: { limit: 12, sort: { field: 'home_score', order: 'desc' } },
    },
    result: {
      data: {
        results: {
          results: [
            {
              _id: '2',
              date: '2022-06-02',
              home_team: 'Team C',
              away_team: 'Team D',
              home_score: 5,
              away_score: 0,
              tournament: 'UEFA Nations League',
              city: 'City B',
              country: 'Country B',
              neutral: false,
              home_team_no: 'Lag C',
              away_team_no: 'Lag D',
            },
          ],
          total: 1,
          currentPage: 1,
          totalPages: 1,
        },
      },
    },
  },
  {
    request: {
      query: GET_RESULTS,
      variables: { limit: 12, sort: { field: 'goal_difference', order: -1 } },
    },
    result: {
      data: {
        results: {
          results: [
            {
              _id: '3',
              date: '2022-06-03',
              home_team: 'Team E',
              away_team: 'Team F',
              home_score: 4,
              away_score: 1,
              tournament: 'UEFA Nations League',
              city: 'City C',
              country: 'Country C',
              neutral: false,
              home_team_no: 'Lag E',
              away_team_no: 'Lag F',
            },
          ],
          total: 1,
          currentPage: 1,
          totalPages: 1,
        },
      },
    },
  },
  {
    request: {
      query: SEARCH,
      variables: { searchTerm: '', language: 'en', limit: 5 },
    },
    result: {
      data: {
        search: {
          nations: [
            { en: 'Norway', no: 'Norge' },
            { en: 'Sweden', no: 'Sverige' },
          ],
          tournaments: [
            { en: 'World Cup', no: 'Verdensmesterskap' },
            { en: 'Euro Cup', no: 'Europamesterskap' },
          ],
        },
      },
    },
  },
];
