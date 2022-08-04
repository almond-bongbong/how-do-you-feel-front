import { gql } from '@apollo/client';

export const GET_PLACE_LIST_QUERY = gql`
  query GetPlaceList($input: GetPlaceListInput!) {
    getPlaceList(input: $input) {
      items {
        id
        content
        images {
          key
          url
        }
        address
        longitude
        latitude
        buildingName
        isLiked
        likeCount
        account {
          id
          username
          profileImage {
            key
            url
          }
        }
      }
      total
    }
  }
`;
