import { GET_RESULT } from '../../graphql/resultOperations';
import { SEARCH } from '../../graphql/searchOperations';
import { GET_GOALSCORERS } from '../../graphql/resultOperations';
import { GET_COMMENTS } from '../../graphql/commentOperations';
import { MockedResponse } from '@apollo/client/testing';


export const mockResultData: MockedResponse[] = [
    {
      request: {
        query: GET_RESULT,
        variables: { id: '123' },
      },
      result: {
        data: {
          result: {
            _id: '123',
            home_team: 'Team A',
            home_team_no: 'Team A',
            away_team: 'Team B',
            away_team_no: 'Team B',
            home_score: 2,
            away_score: 1,
            date: '2024-11-20',
            tournament: 'Friendly',
            city: 'City A',
            country: 'Country A',
            neutral: false,
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
    {
      request: {
        query: GET_GOALSCORERS,
        variables: {
          home_team: 'Team A',
          away_team: 'Team B',
          date: '2024-11-20',
        },
      },
      result: {
        data: {
          goalscorers: [
            {
              _id: '1',
              date: '2024-11-20',
              home_team: 'Team A',
              away_team: 'Team B',
              minute: 45,
              own_goal: false,
              penalty: true,
              scorer: 'Player 1',
              team: 'Team A',
            },
          ],
        },
      },
    },
    {
      request: {
        query: GET_COMMENTS,
        variables: { resultId: '123', page: 1, limit: 10 },
      },
      result: {
        data: {
          getComments: {
            comments: [
              { user_name: 'John Doe', date: '2024-11-20', comment: 'Great match!', result_id: '123' },
              { user_name: 'Jane Smith', date: '2024-11-20', comment: 'Amazing game!', result_id: '123' },
            ],
            totalCount: 2,
            totalPages: 1,
          },
        },
      },
    },
  ];