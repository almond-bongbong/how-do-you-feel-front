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
      }
      total
    }
  }
`;

export const GET_MY_LIKE_PLACE_LIST_QUERY = gql`
  query GetMyLikePlaceList($input: GetMyLikePlaceListInput!) {
    getMyLikePlaceList(input: $input) {
      total
      items {
        id
        content
        address
        account {
          id
          username
          profileImage {
            key
            url
          }
        }
        likedAt
      }
    }
  }
`;
