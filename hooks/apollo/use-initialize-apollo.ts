import { getApolloClient } from '@src/apollo/client';
import { useMemo } from 'react';
import { NormalizedCacheObject } from '@apollo/client';

export function useInitializeApollo(initialState?: NormalizedCacheObject) {
  return useMemo(() => getApolloClient(initialState), [initialState]);
}
