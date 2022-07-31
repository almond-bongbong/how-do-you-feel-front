import { gql } from '@apollo/client';

export const CREATE_PLACE_MUTATION = gql`
  mutation CreatePlace($input: CreatePlaceInput!) {
    createPlace(input: $input) {
      id
    }
  }
`;
