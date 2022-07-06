import { ApolloClient, createHttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { NextPageContext } from 'next';
import cookie from 'cookie';
import { TOKEN_KEY } from '../constants/keys';
import { isBrowser, isServer } from '../libs/environment';

const httpLink = createHttpLink({
  uri: 'http://localhost:4040/graphql',
});

const authLink = setContext((_, context: NextPageContext) => {
  const token = cookie.parse(context?.req?.headers.cookie || '')[TOKEN_KEY];
  return {
    headers: {
      ...context?.req?.headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

let apolloClient: ApolloClient<NormalizedCacheObject>;

export const getApolloClient = () => {
  if (isBrowser() && apolloClient) return apolloClient;

  apolloClient = new ApolloClient({
    ssrMode: isServer(),
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    defaultOptions: {
      query: {
        fetchPolicy: 'network-only',
      },
    },
  });

  return apolloClient;
};
