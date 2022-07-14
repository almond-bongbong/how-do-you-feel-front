import { gql } from '@apollo/client';

export const AUTH_QUERY = gql`
  query Auth {
    auth {
      id
      username
    }
  }
`;
