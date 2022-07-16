import { useEffect } from 'react';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { useRouter } from 'next/router';
import { loadingRouterVar } from '@src/apollo/cache';

function useInitializeRouterLoading(): void {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChangeStart = () => {
      NProgress.start();
      loadingRouterVar(true);
    };

    const handleRouteChangeComplete = () => {
      NProgress.done();
      loadingRouterVar(false);
    };

    const handleRouteChangeError = () => {
      NProgress.done();
      loadingRouterVar(false);
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    router.events.on('routeChangeError', handleRouteChangeError);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      router.events.off('routeChangeError', handleRouteChangeError);
    };
  }, [router.events]);
}

export default useInitializeRouterLoading;
