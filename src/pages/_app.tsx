import '@/styles/globals.css'
import type { AppProps } from 'next/app'

// import Font Awesome CSS
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";

import { ApolloProvider } from '@apollo/client';
import { useApollo } from '@/libs/apollo/apolloClient';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import { Open_Sans } from 'next/font/google'
import { RecoilRoot } from 'recoil';
import { Meta } from '@/components/meta/Meta';

// Tell Font Awesome to skip adding the CSS automatically 
// since it's already imported above
config.autoAddCss = false;
const openSans = Open_Sans({ subsets: ['latin'], weight:["400"] })

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  const apolloClient = useApollo(pageProps);
  return (
    getLayout(
      <>
        <ApolloProvider client={apolloClient}>
          <RecoilRoot>
            <main className={openSans.className}>
              <Component {...pageProps} />
            </main>
          </RecoilRoot>
        </ApolloProvider>
      </>
    )
  )
}
