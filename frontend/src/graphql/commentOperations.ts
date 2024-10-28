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