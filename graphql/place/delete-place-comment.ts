import { gql } from '@apollo/client';

export const DELETE_PLACE_COMMENT_MUTATION = gql`
  mutation DeletePlaceComment($input: DeletePlaceCommentInput!) {
    deletePlaceComment(input: $input) {
      isDeleted
    }
  }
`;
