import { gql } from '@apollo/client';

export const TOGGLE_FOLLOW_MUTATION = gql`
  mutation ToggleFollow($input: ToggleFollowInput!) {
    toggleFollow(input: $input) {
      isFollowed
    }
  }
`;
