import { makeVar } from '@apollo/client';
import 'nprogress/nprogress.css';
import { MeQuery } from '@src/generated/graphql';

export interface AuthVar {
  isLoggedIn: boolean | null;
  user: MeQuery['me'] | null;
}

export const authVar = makeVar<AuthVar>({
  isLoggedIn: null,
  user: null,
});

export const loadingRouterVar = makeVar(false);
