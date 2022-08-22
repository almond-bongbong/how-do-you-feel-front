import { gql } from '@apollo/client';

export const TOGGLE_PLACE_BOOKMARK_MUTATION = gql`
  mutation TogglePlaceBookmark($input: TogglePlaceBookmarkInput!) {
    togglePlaceBookmark(input: $input) {
      isBookmarked
    }
  }
`;
