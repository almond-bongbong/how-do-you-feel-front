import { gql } from '@apollo/client';

export const GET_PLACE_COMMENT_LIST_QUERY = gql`
  query GetPlaceCommentList($input: GetPlaceCommentListInput!) {
    getPlaceCommentList(input: $input) {
      total
      items {
        id
        content
        account {
          id
          username
          profileImage {
            key
            url
          }
        }
      }
    }
  }
`;
