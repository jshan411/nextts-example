import GlobalLayout from '@/components/globalLayout';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ReactNode } from 'react';

type AppPropsWithLayout = AppProps & {
  Component: AppProps['Component'] & {
    getLayout?: (page: ReactNode) => ReactNode;
  };
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page: ReactNode) => page);
  return <GlobalLayout>{getLayout(<Component {...pageProps} />)}</GlobalLayout>;
}
