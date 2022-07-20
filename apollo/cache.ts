import { ApolloQueryResult, makeVar } from '@apollo/client';
import 'nprogress/nprogress.css';
import { MeQuery, MeQueryVariables } from '@src/generated/graphql';

export interface AuthVar {
  isLoggedIn: boolean | null;
  user: MeQuery['me'] | null;
  refetchMe: ((variable?: Partial<MeQueryVariables>) => Promise<ApolloQueryResult<MeQuery>>) | null;
}

export const authVar = makeVar<AuthVar>({
  isLoggedIn: null,
  user: null,
  refetchMe: null,
});

export const loadingRouterVar = makeVar(false);
