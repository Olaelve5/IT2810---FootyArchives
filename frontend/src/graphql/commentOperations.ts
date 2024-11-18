import { gql } from '@apollo/client';


export const POST_COMMENT = gql`
    mutation AddComment($resultId: ID!, $comment: String!, $userName: String!) {
        addComment(result_id: $resultId, comment: $comment, user_name: $userName) {
        user_name
        date
        comment
        result_id
        }
    }

`;


export const GET_COMMENTS = gql`
  query getComments($resultId: ID!, $limit: Int, $page: Int) {
    getComments(result_id: $resultId, limit: $limit, page: $page) {
      comments {
        user_name
        date
        comment
        result_id
      }
      totalCount
      totalPages
    }
  }
`;