import { useReactiveVar } from '@apollo/client';
import { authVar } from '../../apollo/cache';
import { useCallback } from 'react';
import Cookies from 'js-cookie';
import { TOKEN_KEY } from '../../constants/keys';
import { useRouter } from 'next/router';

function useCurrentUser() {
  const router = useRouter();
  const { isLoggedIn, user } = useReactiveVar(authVar);

  const logout = useCallback(async () => {
    Cookies.remove(TOKEN_KEY);
    await router.push('/login');
    authVar({ isLoggedIn: false, user: null });
  }, [router]);

  return {
    isInitialized: isLoggedIn !== null,
    isLoggedIn,
    currentUser: user,
    logout,
  };
}

export default useCurrentUser;
