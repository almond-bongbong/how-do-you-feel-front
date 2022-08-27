import '../styles/normalize.scss';
import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { NextComponentType } from 'next';
import { SharedComponentAttributes } from '@src/types/page';
import AuthProvider from '@src/provider/auth-provider';
import useInitializeRouterLoading from '@src/hooks/common/use-initialize-router-loading';
import SEO from '@src/components/common/util/seo';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { useInitializeApollo } from '@src/hooks/apollo/use-initialize-apollo';

config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
  useInitializeRouterLoading();
  const client = useInitializeApollo(pageProps.initialState);

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
