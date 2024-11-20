import { GET_TOURNAMENTS } from '../../graphql/tournamentOperations';
import { SEARCH } from '../../graphql/searchOperations';
import { MockedResponse } from '@apollo/client/testing';

export const mockTournamentData: MockedResponse[] = [
  {
    request: {
      query: GET_TOURNAMENTS,
      variables: { tournamentName: 'UEFA Nations League', page: 1 },
    },
    result: {
      data: {
        tournaments: {
          paginatedResults: [
            {
              _id: '1',
              year: 2022,
              tournament: 'UEFA Nations League',
              results: [
                {
                  _id: '1',
                  tournament: 'UEFA Nations League',
                  home_team: 'Team A',
                  home_team_no: 'Lag A',
                  away_team: 'Team B',
                  away_team_no: 'Lag B',
                  home_score: 3,
                  away_score: 2,
                  city: 'City A',
                  country: 'Country A',
                  date: '2022-06-01',
                },
              ],
            },
          ],
          totalCount: 1,
          startYear: 1930,
          endYear: 2022,
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
