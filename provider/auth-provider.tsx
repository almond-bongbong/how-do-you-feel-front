import { ReactElement, ReactNode } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import useIsomorphicLayoutEffect from '../hooks/common/useIsomorphicLayoutEffect';
import { TOKEN_KEY } from '../constants/keys';
import { useAuthQuery } from '../generated/graphql';
import { authVar } from '../apollo/cache';
import useCurrentUser from '../hooks/auth/useCurrentUser';

interface Props {
  children: ReactNode;
  isPrivatePage?: boolean;
}

function AuthProvider({ children, isPrivatePage }: Props): ReactElement {
  const token = Cookies.get(TOKEN_KEY);
  const router = useRouter();
  const { isLoggedIn } = useCurrentUser();
  const { data, error } = useAuthQuery({
    skip: !token,
  });

  useIsomorphicLayoutEffect(() => {
    if (data?.auth) {
      authVar({
        isLoggedIn: true,
        user: data.auth,
      });
    }
  }, [data]);

  useIsomorphicLayoutEffect(() => {
    if (!token || error?.graphQLErrors[0]?.extensions?.type === 'UNAUTHENTICATED') {
      Cookies.remove(TOKEN_KEY);
      authVar({
        isLoggedIn: false,
        user: null,
      });

      if (isPrivatePage) {
        router.replace(`/login?from=${encodeURIComponent(router.asPath)}`);
      }
    }
  }, [token, error]);

  if (isPrivatePage && !isLoggedIn) return <div>loading...</div>;
  return <>{children}</>;
}

export default AuthProvider;
