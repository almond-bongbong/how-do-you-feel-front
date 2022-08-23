import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AccountDto = {
  __typename?: 'AccountDto';
  bannerImage?: Maybe<ImageDto>;
  bio?: Maybe<Scalars['String']>;
  createdAt: Scalars['Float'];
  email?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  location?: Maybe<Scalars['String']>;
  platform: AccountPlatform;
  profileImage?: Maybe<ImageDto>;
  role: AccountRole;
  updatedAt: Scalars['Float'];
  username: Scalars['String'];
};

export enum AccountPlatform {
  Email = 'EMAIL',
  Kakao = 'KAKAO'
}

export enum AccountRole {
  Admin = 'ADMIN',
  Client = 'CLIENT'
}

export type AuthOutput = {
  __typename?: 'AuthOutput';
  id: Scalars['String'];
  username: Scalars['String'];
};

export type ChangePasswordInput = {
  currentPassword: Scalars['String'];
  newPassword: Scalars['String'];
  newPasswordConfirm: Scalars['String'];
};

export type ChangePasswordOutput = {
  __typename?: 'ChangePasswordOutput';
  success: Scalars['Boolean'];
};

export type CreatePlaceCommentInput = {
  accountId: Scalars['String'];
  content: Scalars['String'];
  images: Array<ImageInput>;
  placeId: Scalars['Int'];
};

export type CreatePlaceInput = {
  address?: InputMaybe<Scalars['String']>;
  buildingName?: InputMaybe<Scalars['String']>;
  content: Scalars['String'];
  images?: InputMaybe<Array<ImageInput>>;
  latitude?: InputMaybe<Scalars['Float']>;
  longitude?: InputMaybe<Scalars['Float']>;
};

export type DeletePlaceInput = {
  id: Scalars['Int'];
};

export type DeletePlaceOutput = {
  __typename?: 'DeletePlaceOutput';
  isDeleted: Scalars['Boolean'];
};

export type EditProfileInput = {
  bannerImage?: InputMaybe<ImageInput>;
  bio?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
  profileImage?: InputMaybe<ImageInput>;
  username: Scalars['String'];
};

export type EditProfileOutput = {
  __typename?: 'EditProfileOutput';
  bannerImage?: Maybe<ImageDto>;
  bio?: Maybe<Scalars['String']>;
  createdAt: Scalars['Float'];
  email?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  location?: Maybe<Scalars['String']>;
  platform: AccountPlatform;
  profileImage?: Maybe<ImageDto>;
  role: AccountRole;
  updatedAt: Scalars['Float'];
  username: Scalars['String'];
};

export type GetPlaceInput = {
  id: Scalars['Int'];
};

export type GetPlaceListInput = {
  accountId?: InputMaybe<Scalars['String']>;
  bookmarkedAccountId?: InputMaybe<Scalars['String']>;
  likedAccountId?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type GetPlaceListOutput = {
  __typename?: 'GetPlaceListOutput';
  items: Array<PlaceDto>;
  total: Scalars['Int'];
};

export type GetProfileInput = {
  id: Scalars['String'];
};

export type GetProfileOutput = {
  __typename?: 'GetProfileOutput';
  bannerImage?: Maybe<ImageDto>;
  bio?: Maybe<Scalars['String']>;
  followedByCount: Scalars['Int'];
  followingCount: Scalars['Int'];
  id: Scalars['String'];
  isFollowed: Scalars['Boolean'];
  location?: Maybe<Scalars['String']>;
  platform: AccountPlatform;
  profileImage?: Maybe<ImageDto>;
  username: Scalars['String'];
};

export type ImageDto = {
  __typename?: 'ImageDto';
  key: Scalars['String'];
  url: Scalars['String'];
};

export type ImageInput = {
  key: Scalars['String'];
  url: Scalars['String'];
};

export type MeOutput = {
  __typename?: 'MeOutput';
  bannerImage?: Maybe<ImageDto>;
  bio?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  location?: Maybe<Scalars['String']>;
  platform: AccountPlatform;
  profileImage?: Maybe<ImageDto>;
  role: AccountRole;
  username: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: ChangePasswordOutput;
  createPlace: PlaceDto;
  createPlaceComment: PlaceCommentDto;
  deletePlace: DeletePlaceOutput;
  editProfile: EditProfileOutput;
  signIn: SignInOutput;
  signUp: SignUpOutput;
  toggleFollow: ToggleFollowOutput;
  togglePlaceBookmark: TogglePlaceBookmarkOutput;
  togglePlaceLike: TogglePlaceLikeOutput;
};


export type MutationChangePasswordArgs = {
  input: ChangePasswordInput;
};


export type MutationCreatePlaceArgs = {
  input: CreatePlaceInput;
};


export type MutationCreatePlaceCommentArgs = {
  input: CreatePlaceCommentInput;
};


export type MutationDeletePlaceArgs = {
  input: DeletePlaceInput;
};


export type MutationEditProfileArgs = {
  input: EditProfileInput;
};


export type MutationSignInArgs = {
  input: SignInInput;
};


export type MutationSignUpArgs = {
  input: SignUpInput;
};


export type MutationToggleFollowArgs = {
  input: ToggleFollowInput;
};


export type MutationTogglePlaceBookmarkArgs = {
  input: TogglePlaceBookmarkInput;
};


export type MutationTogglePlaceLikeArgs = {
  input: TogglePlaceLikeInput;
};

export type PlaceCommentDto = {
  __typename?: 'PlaceCommentDto';
  account: AccountDto;
  content: Scalars['String'];
  createdAt: Scalars['Float'];
  id: Scalars['Int'];
  images: Array<ImageDto>;
  place: PlaceDto;
  updatedAt: Scalars['Float'];
};

export type PlaceDto = {
  __typename?: 'PlaceDto';
  account: AccountDto;
  address?: Maybe<Scalars['String']>;
  bookmarkCount: Scalars['Int'];
  buildingName?: Maybe<Scalars['String']>;
  comments: Array<PlaceCommentDto>;
  content: Scalars['String'];
  createdAt: Scalars['Float'];
  id: Scalars['Int'];
  images?: Maybe<Array<ImageDto>>;
  isBookmarked: Scalars['Boolean'];
  isLiked: Scalars['Boolean'];
  latitude?: Maybe<Scalars['Float']>;
  likeCount: Scalars['Int'];
  longitude?: Maybe<Scalars['Float']>;
  updatedAt: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  auth: AuthOutput;
  getPlace: PlaceDto;
  getPlaceList: GetPlaceListOutput;
  getProfile: GetProfileOutput;
  hello: Scalars['String'];
  me: MeOutput;
};


export type QueryGetPlaceArgs = {
  input: GetPlaceInput;
};


export type QueryGetPlaceListArgs = {
  input: GetPlaceListInput;
};


export type QueryGetProfileArgs = {
  input: GetProfileInput;
};

export type SignInInput = {
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  /** EMAIL, KAKAO */
  platform: Scalars['String'];
  platformAccessToken?: InputMaybe<Scalars['String']>;
};

export type SignInOutput = {
  __typename?: 'SignInOutput';
  token: Scalars['String'];
};

export type SignUpInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type SignUpOutput = {
  __typename?: 'SignUpOutput';
  createdAt: Scalars['Float'];
  email?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  username: Scalars['String'];
};

export type ToggleFollowInput = {
  id: Scalars['String'];
};

export type ToggleFollowOutput = {
  __typename?: 'ToggleFollowOutput';
  isFollowed: Scalars['Boolean'];
};

export type TogglePlaceBookmarkInput = {
  placeId: Scalars['Int'];
};

export type TogglePlaceBookmarkOutput = {
  __typename?: 'TogglePlaceBookmarkOutput';
  isBookmarked: Scalars['Boolean'];
};

export type TogglePlaceLikeInput = {
  placeId: Scalars['Int'];
};

export type TogglePlaceLikeOutput = {
  __typename?: 'TogglePlaceLikeOutput';
  isLiked: Scalars['Boolean'];
};

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'MeOutput', id: string, username: string, bio?: string | null, location?: string | null, platform: AccountPlatform, bannerImage?: { __typename?: 'ImageDto', key: string, url: string } | null, profileImage?: { __typename?: 'ImageDto', key: string, url: string } | null } };

export type ChangePasswordMutationVariables = Exact<{
  input: ChangePasswordInput;
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'ChangePasswordOutput', success: boolean } };

export type EditProfileMutationVariables = Exact<{
  input: EditProfileInput;
}>;


export type EditProfileMutation = { __typename?: 'Mutation', editProfile: { __typename?: 'EditProfileOutput', id: string } };

export type GetProfileQueryVariables = Exact<{
  input: GetProfileInput;
}>;


export type GetProfileQuery = { __typename?: 'Query', getProfile: { __typename?: 'GetProfileOutput', id: string, username: string, location?: string | null, bio?: string | null, isFollowed: boolean, followedByCount: number, followingCount: number, profileImage?: { __typename?: 'ImageDto', key: string, url: string } | null, bannerImage?: { __typename?: 'ImageDto', key: string, url: string } | null } };

export type SignInMutationVariables = Exact<{
  input: SignInInput;
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn: { __typename?: 'SignInOutput', token: string } };

export type SignUpMutationVariables = Exact<{
  input: SignUpInput;
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: { __typename?: 'SignUpOutput', id: string } };

export type ToggleFollowMutationVariables = Exact<{
  input: ToggleFollowInput;
}>;


export type ToggleFollowMutation = { __typename?: 'Mutation', toggleFollow: { __typename?: 'ToggleFollowOutput', isFollowed: boolean } };

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = { __typename?: 'Query', hello: string };

export type CreatePlaceMutationVariables = Exact<{
  input: CreatePlaceInput;
}>;


export type CreatePlaceMutation = { __typename?: 'Mutation', createPlace: { __typename?: 'PlaceDto', id: number } };

export type GetPlaceListQueryVariables = Exact<{
  input: GetPlaceListInput;
}>;


export type GetPlaceListQuery = { __typename?: 'Query', getPlaceList: { __typename?: 'GetPlaceListOutput', total: number, items: Array<{ __typename?: 'PlaceDto', id: number, content: string, address?: string | null, longitude?: number | null, latitude?: number | null, buildingName?: string | null, isLiked: boolean, likeCount: number, isBookmarked: boolean, bookmarkCount: number, images?: Array<{ __typename?: 'ImageDto', key: string, url: string }> | null, account: { __typename?: 'AccountDto', id: string, username: string, profileImage?: { __typename?: 'ImageDto', key: string, url: string } | null } }> } };

export type TogglePlaceBookmarkMutationVariables = Exact<{
  input: TogglePlaceBookmarkInput;
}>;


export type TogglePlaceBookmarkMutation = { __typename?: 'Mutation', togglePlaceBookmark: { __typename?: 'TogglePlaceBookmarkOutput', isBookmarked: boolean } };

export type TogglePlaceLikeMutationVariables = Exact<{
  input: TogglePlaceLikeInput;
}>;


export type TogglePlaceLikeMutation = { __typename?: 'Mutation', togglePlaceLike: { __typename?: 'TogglePlaceLikeOutput', isLiked: boolean } };


export const MeDocument = gql`
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

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($input: ChangePasswordInput!) {
  changePassword(input: $input) {
    success
  }
}
    `;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const EditProfileDocument = gql`
    mutation EditProfile($input: EditProfileInput!) {
  editProfile(input: $input) {
    id
  }
}
    `;
export type EditProfileMutationFn = Apollo.MutationFunction<EditProfileMutation, EditProfileMutationVariables>;

/**
 * __useEditProfileMutation__
 *
 * To run a mutation, you first call `useEditProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editProfileMutation, { data, loading, error }] = useEditProfileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditProfileMutation(baseOptions?: Apollo.MutationHookOptions<EditProfileMutation, EditProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditProfileMutation, EditProfileMutationVariables>(EditProfileDocument, options);
      }
export type EditProfileMutationHookResult = ReturnType<typeof useEditProfileMutation>;
export type EditProfileMutationResult = Apollo.MutationResult<EditProfileMutation>;
export type EditProfileMutationOptions = Apollo.BaseMutationOptions<EditProfileMutation, EditProfileMutationVariables>;
export const GetProfileDocument = gql`
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
    isFollowed
    followedByCount
    followingCount
  }
}
    `;

/**
 * __useGetProfileQuery__
 *
 * To run a query within a React component, call `useGetProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProfileQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetProfileQuery(baseOptions: Apollo.QueryHookOptions<GetProfileQuery, GetProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, options);
      }
export function useGetProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProfileQuery, GetProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, options);
        }
export type GetProfileQueryHookResult = ReturnType<typeof useGetProfileQuery>;
export type GetProfileLazyQueryHookResult = ReturnType<typeof useGetProfileLazyQuery>;
export type GetProfileQueryResult = Apollo.QueryResult<GetProfileQuery, GetProfileQueryVariables>;
export const SignInDocument = gql`
    mutation SignIn($input: SignInInput!) {
  signIn(input: $input) {
    token
  }
}
    `;
export type SignInMutationFn = Apollo.MutationFunction<SignInMutation, SignInMutationVariables>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignInMutation(baseOptions?: Apollo.MutationHookOptions<SignInMutation, SignInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, options);
      }
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<SignInMutation, SignInMutationVariables>;
export const SignUpDocument = gql`
    mutation SignUp($input: SignUpInput!) {
  signUp(input: $input) {
    id
  }
}
    `;
export type SignUpMutationFn = Apollo.MutationFunction<SignUpMutation, SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: Apollo.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, options);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
export const ToggleFollowDocument = gql`
    mutation ToggleFollow($input: ToggleFollowInput!) {
  toggleFollow(input: $input) {
    isFollowed
  }
}
    `;
export type ToggleFollowMutationFn = Apollo.MutationFunction<ToggleFollowMutation, ToggleFollowMutationVariables>;

/**
 * __useToggleFollowMutation__
 *
 * To run a mutation, you first call `useToggleFollowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleFollowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleFollowMutation, { data, loading, error }] = useToggleFollowMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useToggleFollowMutation(baseOptions?: Apollo.MutationHookOptions<ToggleFollowMutation, ToggleFollowMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ToggleFollowMutation, ToggleFollowMutationVariables>(ToggleFollowDocument, options);
      }
export type ToggleFollowMutationHookResult = ReturnType<typeof useToggleFollowMutation>;
export type ToggleFollowMutationResult = Apollo.MutationResult<ToggleFollowMutation>;
export type ToggleFollowMutationOptions = Apollo.BaseMutationOptions<ToggleFollowMutation, ToggleFollowMutationVariables>;
export const HelloDocument = gql`
    query Hello {
  hello
}
    `;

/**
 * __useHelloQuery__
 *
 * To run a query within a React component, call `useHelloQuery` and pass it any options that fit your needs.
 * When your component renders, `useHelloQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelloQuery({
 *   variables: {
 *   },
 * });
 */
export function useHelloQuery(baseOptions?: Apollo.QueryHookOptions<HelloQuery, HelloQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HelloQuery, HelloQueryVariables>(HelloDocument, options);
      }
export function useHelloLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HelloQuery, HelloQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HelloQuery, HelloQueryVariables>(HelloDocument, options);
        }
export type HelloQueryHookResult = ReturnType<typeof useHelloQuery>;
export type HelloLazyQueryHookResult = ReturnType<typeof useHelloLazyQuery>;
export type HelloQueryResult = Apollo.QueryResult<HelloQuery, HelloQueryVariables>;
export const CreatePlaceDocument = gql`
    mutation CreatePlace($input: CreatePlaceInput!) {
  createPlace(input: $input) {
    id
  }
}
    `;
export type CreatePlaceMutationFn = Apollo.MutationFunction<CreatePlaceMutation, CreatePlaceMutationVariables>;

/**
 * __useCreatePlaceMutation__
 *
 * To run a mutation, you first call `useCreatePlaceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePlaceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPlaceMutation, { data, loading, error }] = useCreatePlaceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePlaceMutation(baseOptions?: Apollo.MutationHookOptions<CreatePlaceMutation, CreatePlaceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePlaceMutation, CreatePlaceMutationVariables>(CreatePlaceDocument, options);
      }
export type CreatePlaceMutationHookResult = ReturnType<typeof useCreatePlaceMutation>;
export type CreatePlaceMutationResult = Apollo.MutationResult<CreatePlaceMutation>;
export type CreatePlaceMutationOptions = Apollo.BaseMutationOptions<CreatePlaceMutation, CreatePlaceMutationVariables>;
export const GetPlaceListDocument = gql`
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

/**
 * __useGetPlaceListQuery__
 *
 * To run a query within a React component, call `useGetPlaceListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPlaceListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPlaceListQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetPlaceListQuery(baseOptions: Apollo.QueryHookOptions<GetPlaceListQuery, GetPlaceListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPlaceListQuery, GetPlaceListQueryVariables>(GetPlaceListDocument, options);
      }
export function useGetPlaceListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPlaceListQuery, GetPlaceListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPlaceListQuery, GetPlaceListQueryVariables>(GetPlaceListDocument, options);
        }
export type GetPlaceListQueryHookResult = ReturnType<typeof useGetPlaceListQuery>;
export type GetPlaceListLazyQueryHookResult = ReturnType<typeof useGetPlaceListLazyQuery>;
export type GetPlaceListQueryResult = Apollo.QueryResult<GetPlaceListQuery, GetPlaceListQueryVariables>;
export const TogglePlaceBookmarkDocument = gql`
    mutation TogglePlaceBookmark($input: TogglePlaceBookmarkInput!) {
  togglePlaceBookmark(input: $input) {
    isBookmarked
  }
}
    `;
export type TogglePlaceBookmarkMutationFn = Apollo.MutationFunction<TogglePlaceBookmarkMutation, TogglePlaceBookmarkMutationVariables>;

/**
 * __useTogglePlaceBookmarkMutation__
 *
 * To run a mutation, you first call `useTogglePlaceBookmarkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTogglePlaceBookmarkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [togglePlaceBookmarkMutation, { data, loading, error }] = useTogglePlaceBookmarkMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTogglePlaceBookmarkMutation(baseOptions?: Apollo.MutationHookOptions<TogglePlaceBookmarkMutation, TogglePlaceBookmarkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TogglePlaceBookmarkMutation, TogglePlaceBookmarkMutationVariables>(TogglePlaceBookmarkDocument, options);
      }
export type TogglePlaceBookmarkMutationHookResult = ReturnType<typeof useTogglePlaceBookmarkMutation>;
export type TogglePlaceBookmarkMutationResult = Apollo.MutationResult<TogglePlaceBookmarkMutation>;
export type TogglePlaceBookmarkMutationOptions = Apollo.BaseMutationOptions<TogglePlaceBookmarkMutation, TogglePlaceBookmarkMutationVariables>;
export const TogglePlaceLikeDocument = gql`
    mutation TogglePlaceLike($input: TogglePlaceLikeInput!) {
  togglePlaceLike(input: $input) {
    isLiked
  }
}
    `;
export type TogglePlaceLikeMutationFn = Apollo.MutationFunction<TogglePlaceLikeMutation, TogglePlaceLikeMutationVariables>;

/**
 * __useTogglePlaceLikeMutation__
 *
 * To run a mutation, you first call `useTogglePlaceLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTogglePlaceLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [togglePlaceLikeMutation, { data, loading, error }] = useTogglePlaceLikeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTogglePlaceLikeMutation(baseOptions?: Apollo.MutationHookOptions<TogglePlaceLikeMutation, TogglePlaceLikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TogglePlaceLikeMutation, TogglePlaceLikeMutationVariables>(TogglePlaceLikeDocument, options);
      }
export type TogglePlaceLikeMutationHookResult = ReturnType<typeof useTogglePlaceLikeMutation>;
export type TogglePlaceLikeMutationResult = Apollo.MutationResult<TogglePlaceLikeMutation>;
export type TogglePlaceLikeMutationOptions = Apollo.BaseMutationOptions<TogglePlaceLikeMutation, TogglePlaceLikeMutationVariables>;