import '../styles/normalize.scss';
import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { NextComponentType } from 'next';
import { SharedComponentAttributes } from '@src/types/page';
import { getApolloClient } from '@src/apollo/client';
import AuthProvider from '@src/provider/auth-provider';
import useInitializeRouterLoading from '@src/hooks/common/use-initialize-router-loading';
import SEO from '@src/components/common/util/seo';

const client = getApolloClient();

function MyApp({ Component, pageProps }: AppProps) {
  useInitializeRouterLoading();

  const PageComponent = Component as NextComponentType & SharedComponentAttributes;

  return (
    <ApolloProvider client={client}>
      <AuthProvider isPrivatePage={PageComponent.isPrivatePage}>
        <SEO />
        <Component {...pageProps} />
      </AuthProvider>
    </ApolloProvider>
  );
}

export default MyApp;
