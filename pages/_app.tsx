import '../styles/normalize.scss';
import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { getApolloClient } from '../apollo/client';
import AuthProvider from '../provider/auth-provider';
import { NextComponentType } from 'next';

const client = getApolloClient();
export interface SharedComponentAttributes {
  isPrivatePage: boolean;
}

function MyApp({ Component, pageProps }: AppProps) {
  const PageComponent = Component as NextComponentType & SharedComponentAttributes;

  console.log('render');

  return (
    <ApolloProvider client={client}>
      <AuthProvider isPrivatePage={PageComponent.isPrivatePage}>
        <Component {...pageProps} />
      </AuthProvider>
    </ApolloProvider>
  );
}

export default MyApp;
