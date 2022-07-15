import { makeVar } from '@apollo/client';

export interface AuthVar {
  isLoggedIn: boolean | null;
  user: {
    id: string;
    username: string;
  } | null;
}

export const authVar = makeVar<AuthVar>({
  isLoggedIn: null,
  user: null,
});
