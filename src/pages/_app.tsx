// import '../styles/global.css';
import { httpBatchLink } from '@trpc/client/links/httpBatchLink';
import { loggerLink } from '@trpc/client/links/loggerLink';
import { wsLink, createWSClient } from '@trpc/client/links/wsLink';
import { withTRPC } from '@trpc/next';
import { getSession, SessionProvider } from 'next-auth/react';
import getConfig from 'next/config';
import { AppType } from 'next/dist/shared/lib/utils';
// import type { AppRouter } from 'server/routers/_app';
import superjson from 'superjson';
import { AppRouter } from '../server/routers/_app';



const MyApp: AppType = ({ Component, pageProps }) => {
  return (
      <Component {...pageProps} />
  );
};

export default withTRPC<AppRouter>({
  config({ ctx }) {

    return {


      links: [

        httpBatchLink({
          url: `http://localhost:3000/api/trpc`,
        })
      ],

    };
  },
  ssr: true,
})(MyApp);
