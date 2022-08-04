import { gql } from '@apollo/client';

export const TOGGLE_PLACE_LIKE_MUTATION = gql`
  mutation TogglePlaceLike($input: TogglePlaceLikeInput!) {
    togglePlaceLike(input: $input) {
      isLiked
    }
  }
`;
