import { gql } from '@apollo/client';

export const GET_PROFILE_QUERY = gql`
  query GetProfile($input: GetProfileInput!) {
    getProfile(input: $input) {
      id
      username
      profileImage {
        key
        url
      }
      bannerImage {
        key
        url
      }
      location
      bio
    }
  }
`;
