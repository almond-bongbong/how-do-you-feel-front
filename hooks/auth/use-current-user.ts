import { useReactiveVar } from '@apollo/client';
import { useCallback } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { authVar } from '@src/apollo/cache';
import { TOKEN_KEY } from '@src/constants/keys';

function useCurrentUser() {
  const router = useRouter();
  const { isLoggedIn, user, refetchMe } = useReactiveVar(authVar);

  const logout = useCallback(async () => {
    Cookies.remove(TOKEN_KEY);
    await router.push('/login');
    authVar({ isLoggedIn: false, user: null, refetchMe: null });
  }, [router]);

  return {
    isInitialized: isLoggedIn !== null,
    isLoggedIn,
    currentUser: user,
    logout,
    refetchMe,
  };
}

export default useCurrentUser;
