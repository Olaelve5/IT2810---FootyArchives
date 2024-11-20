import { GET_RESULTS } from '../../graphql/resultOperations';
import { SEARCH } from '../../graphql/searchOperations';
import { MockedResponse } from '@apollo/client/testing';

export const mockMatchupSearchData: MockedResponse[] = [
  {
    request: {
      query: GET_RESULTS,
      variables: { limit: 12, page: 1, sort: { field: 'date', order: -1 }, filters: {} },
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
      variables: { limit: 24, page: 1, sort: { field: 'date', order: -1 }, filters: { teams: [], tournaments: [], yearRange: { startYear: 1872, endYear: 2024 }, exclusive: false } },
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
