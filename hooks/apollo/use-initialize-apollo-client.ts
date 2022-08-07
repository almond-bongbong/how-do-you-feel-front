import { NormalizedCacheObject, useApolloClient } from '@apollo/client';
import { useMemo } from 'react';

function useInitializeApolloClient(initialState?: NormalizedCacheObject | null) {
  const client = useApolloClient();

  useMemo(() => {
    client.cache.restore({ ...client.extract(), ...initialState });
  }, [client, initialState]);
}

export default useInitializeApolloClient;
