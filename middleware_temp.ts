// import type { NextRequest } from 'next/server';
// import { NextResponse } from 'next/server';
// import { TOKEN_KEY } from './constants/keys';
// import { getApolloClient } from './apollo/client';
// import { AUTH_QUERY } from './graphql/account/auth';
//
// const redirectToLogin = (req: NextRequest) =>
//   NextResponse.redirect(new URL(`/login?from=${req.nextUrl.pathname}`, req.url));
//
// export async function middleware(request: NextRequest) {
//   const token = request.cookies.get(TOKEN_KEY);
//
//   if (!token) return redirectToLogin(request);
//
//   try {
//     const client = getApolloClient();
//     const { data } = await client.query({
//       query: AUTH_QUERY,
//       context: { token },
//     });
//
//     return NextResponse.json(data);
//   } catch (error) {
//     return redirectToLogin(request);
//   }
// }
//
// export const config = {
//   matcher: '/',
// };

export {};
