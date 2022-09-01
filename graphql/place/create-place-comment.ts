import { gql } from '@apollo/client';

export const CREATE_PLACE_COMMENT_MUTATION = gql`
  mutation CreatePlaceComment($input: CreatePlaceCommentInput!) {
    createPlaceComment(input: $input) {
      id
    }
  }
`;
