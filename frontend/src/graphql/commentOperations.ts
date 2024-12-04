import { gql } from '@apollo/client';

export const POST_COMMENT = gql`
  mutation AddComment($resultId: ID!, $comment: String!, $username: String!, $user_id: String) {
    addComment(result_id: $resultId, comment: $comment, username: $username, user_id: $user_id) {
      user {
        id
        username
      }
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
        user {
          id
          username
        }
        date
        comment
        result_id
      }
      totalCount
      totalPages
    }
  }
`;

