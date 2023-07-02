import type { AppContext, AppProps } from 'next/app';
import { AuthProvider } from '@/hook/Auth';

const MyApp = ({ Component, pageProps }: AppProps) => {

  return (
    <AuthProvider>
      <Component {...pageProps} />;
    </AuthProvider>
  );
};

export default MyApp;