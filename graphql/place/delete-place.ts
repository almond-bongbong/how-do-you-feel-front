import { gql } from '@apollo/client';

export const DELETE_PLACE_MUTATION = gql`
  mutation DeletePlace($input: DeletePlaceInput!) {
    deletePlace(input: $input) {
      isDeleted
    }
  }
`;
