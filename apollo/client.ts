import { ApolloClient, createHttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { isBrowser, isServer } from '../libs/environment';
import Cookies from 'js-cookie';
import { TOKEN_KEY } from '../constants/keys';

const httpLink = createHttpLink({
  uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
});

const authLink = setContext((_, context) => {
  const token = context?.req?.cookies?.[TOKEN_KEY] ?? (isBrowser() && Cookies.get(TOKEN_KEY));
  return {
    headers: {
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
      watchQuery: {
        fetchPolicy: 'cache-and-network',
      },
    },
  });

  return apolloClient;
};
