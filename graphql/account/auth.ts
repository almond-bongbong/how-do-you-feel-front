import { gql } from '@apollo/client';

export const AUTH_QUERY = gql`
  query Auth {
    auth {
      id
      username
    }
  }
`;

export const ME_QUERY = gql`
  query Me {
    me {
      id
      username
      bio
      location
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
