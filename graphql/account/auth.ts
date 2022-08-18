import { gql } from '@apollo/client';

export const ME_QUERY = gql`
  query Me {
    me {
      id
      username
      bio
      location
      platform
      bannerImage {
        key
        url
      }
      profileImage {
        key
        url
      }
    }
  }
`;
