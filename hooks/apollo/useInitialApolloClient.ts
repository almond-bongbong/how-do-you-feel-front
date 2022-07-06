import { NormalizedCacheObject, useApolloClient } from '@apollo/client';
import { useMemo } from 'react';

function useInitialApolloClient(initialState: NormalizedCacheObject) {
  const client = useApolloClient();

  useMemo(() => {
    client.cache.restore({ ...client.extract(), ...initialState });
  }, [client, initialState]);
}

export default useInitialApolloClient;
