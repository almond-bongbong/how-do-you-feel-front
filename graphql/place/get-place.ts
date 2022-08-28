import { gql } from '@apollo/client';

export const GET_PLACE_QUERY = gql`
  query GetPlace($input: GetPlaceInput!) {
    getPlace(input: $input) {
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
      isBookmarked
      bookmarkCount
      account {
        id
        username
        profileImage {
          key
          url
        }
      }
      createdAt
    }
  }
`;
