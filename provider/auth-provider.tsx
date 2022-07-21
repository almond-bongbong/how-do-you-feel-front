import { ReactElement, ReactNode } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import useIsomorphicLayoutEffect from '../hooks/common/use-isomorphic-layout-effect';
import { TOKEN_KEY } from '../constants/keys';
import { useMeQuery } from '../generated/graphql';
import { authVar } from '../apollo/cache';
import useCurrentUser from '../hooks/auth/use-current-user';

interface Props {
  children: ReactNode;
  isPrivatePage?: boolean;
}

function AuthProvider({ children, isPrivatePage }: Props): ReactElement {
  const token = Cookies.get(TOKEN_KEY);
  const router = useRouter();
  const { isLoggedIn } = useCurrentUser();
  const { data, error, refetch } = useMeQuery({
    skip: !token,
  });

  useIsomorphicLayoutEffect(() => {
    if (isPrivatePage && !isLoggedIn && token) {
      refetch();
    }
  }, [isPrivatePage, isLoggedIn, token, refetch]);

  useIsomorphicLayoutEffect(() => {
    if (data?.me) {
      authVar({
        isLoggedIn: true,
        user: data.me,
        refetchMe: refetch,
      });
    }
  }, [data]);

  useIsomorphicLayoutEffect(() => {
    if (!token || error?.graphQLErrors[0]?.extensions?.type === 'UNAUTHENTICATED') {
      Cookies.remove(TOKEN_KEY);
      authVar({
        isLoggedIn: false,
        user: null,
        refetchMe: null,
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
