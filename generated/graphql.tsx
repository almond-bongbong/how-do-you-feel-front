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
  DateTime: any;
};

export type AccountDto = {
  __typename?: 'AccountDto';
  bannerImage?: Maybe<ImageDto>;
  bio?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  email?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  location?: Maybe<Scalars['String']>;
  platform: Scalars['String'];
  profileImage?: Maybe<ImageDto>;
  role: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};

export type AuthOutput = {
  __typename?: 'AuthOutput';
  id: Scalars['String'];
  username: Scalars['String'];
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
  latitude?: InputMaybe<Scalars['String']>;
  longitude?: InputMaybe<Scalars['String']>;
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
  createdAt: Scalars['DateTime'];
  email?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  location?: Maybe<Scalars['String']>;
  platform: Scalars['String'];
  profileImage?: Maybe<ImageDto>;
  role: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};

export type GetPlaceInput = {
  id: Scalars['Int'];
};

export type GetPlaceListInput = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type GetPlaceListOutput = {
  __typename?: 'GetPlaceListOutput';
  items: Array<PlaceDto>;
  total: Scalars['Int'];
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
  platform: Scalars['String'];
  profileImage?: Maybe<ImageDto>;
  role: Scalars['String'];
  username: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPlace: PlaceDto;
  createPlaceComment: PlaceCommentDto;
  editProfile: EditProfileOutput;
  signIn: SignInOutput;
  signUp: SignUpOutput;
};


export type MutationCreatePlaceArgs = {
  input: CreatePlaceInput;
};


export type MutationCreatePlaceCommentArgs = {
  input: CreatePlaceCommentInput;
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

export type PlaceCommentDto = {
  __typename?: 'PlaceCommentDto';
  account: AccountDto;
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  images: Array<ImageDto>;
  place: PlaceDto;
  updatedAt: Scalars['DateTime'];
};

export type PlaceDto = {
  __typename?: 'PlaceDto';
  address?: Maybe<Scalars['String']>;
  buildingName?: Maybe<Scalars['String']>;
  comments: Array<PlaceCommentDto>;
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  images?: Maybe<Array<ImageDto>>;
  latitude?: Maybe<Scalars['String']>;
  longitude?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type Query = {
  __typename?: 'Query';
  auth: AuthOutput;
  getPlace: PlaceDto;
  getPlaceList: GetPlaceListOutput;
  hello: Scalars['String'];
  me: MeOutput;
};


export type QueryGetPlaceArgs = {
  input: GetPlaceInput;
};


export type QueryGetPlaceListArgs = {
  input: GetPlaceListInput;
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
  createdAt: Scalars['DateTime'];
  email?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  username: Scalars['String'];
};

export type AuthQueryVariables = Exact<{ [key: string]: never; }>;


export type AuthQuery = { __typename?: 'Query', auth: { __typename?: 'AuthOutput', id: string, username: string } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'MeOutput', id: string, username: string, bio?: string | null, location?: string | null, bannerImage?: { __typename?: 'ImageDto', key: string, url: string } | null, profileImage?: { __typename?: 'ImageDto', key: string, url: string } | null } };

export type EditProfileMutationVariables = Exact<{
  input: EditProfileInput;
}>;


export type EditProfileMutation = { __typename?: 'Mutation', editProfile: { __typename?: 'EditProfileOutput', id: string } };

export type SignInMutationVariables = Exact<{
  input: SignInInput;
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn: { __typename?: 'SignInOutput', token: string } };

export type SignUpMutationVariables = Exact<{
  input: SignUpInput;
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: { __typename?: 'SignUpOutput', id: string } };

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = { __typename?: 'Query', hello: string };

export type CreatePlaceMutationVariables = Exact<{
  input: CreatePlaceInput;
}>;


export type CreatePlaceMutation = { __typename?: 'Mutation', createPlace: { __typename?: 'PlaceDto', id: number } };

export type GetPlaceListQueryVariables = Exact<{
  input: GetPlaceListInput;
}>;


export type GetPlaceListQuery = { __typename?: 'Query', getPlaceList: { __typename?: 'GetPlaceListOutput', total: number, items: Array<{ __typename?: 'PlaceDto', id: number, content: string, address?: string | null, buildingName?: string | null, images?: Array<{ __typename?: 'ImageDto', key: string, url: string }> | null }> } };


export const AuthDocument = gql`
    query Auth {
  auth {
    id
    username
  }
}
    `;

/**
 * __useAuthQuery__
 *
 * To run a query within a React component, call `useAuthQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuthQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuthQuery({
 *   variables: {
 *   },
 * });
 */
export function useAuthQuery(baseOptions?: Apollo.QueryHookOptions<AuthQuery, AuthQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AuthQuery, AuthQueryVariables>(AuthDocument, options);
      }
export function useAuthLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AuthQuery, AuthQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AuthQuery, AuthQueryVariables>(AuthDocument, options);
        }
export type AuthQueryHookResult = ReturnType<typeof useAuthQuery>;
export type AuthLazyQueryHookResult = ReturnType<typeof useAuthLazyQuery>;
export type AuthQueryResult = Apollo.QueryResult<AuthQuery, AuthQueryVariables>;
export const MeDocument = gql`
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
      buildingName
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