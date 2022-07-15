import { useReactiveVar } from '@apollo/client';
import { authVar } from '../../apollo/cache';

function useCurrentUser() {
  const { isLoggedIn, user } = useReactiveVar(authVar);

  return {
    isInitialized: isLoggedIn !== null,
    isLoggedIn,
    currentUser: user,
  };
}

export default useCurrentUser;
