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
        commentCount
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

export const GET_PLACE_LIST_BY_LOCATION_QUERY = gql`
  query GetPlaceListByLocation($input: GetPlaceListByLocationInput!) {
    getPlaceListByLocation(input: $input) {
      total
      items {
        id
        name
        images {
          key
          url
        }
        longitude
        latitude
      }
    }
  }
`;

export const GET_BOOKMARK_PLACE_LIST_QUERY = gql`
  query GetBookmarkPlaceList($input: GetBookmarkPlaceListInput!) {
    getBookmarkPlaceList(input: $input) {
      total
      items {
        id
        address
        images {
          key
          url
        }
      }
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
