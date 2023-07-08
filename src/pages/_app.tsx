import type { AppProps } from 'next/app';
import { AuthProvider } from '@/hook/Auth';
import AuthStateChanged from '@/layout/AuthStateChanged';
import '../app/globals.css'

const MyApp = ({ Component, pageProps }: AppProps) => {

  return (
    <AuthProvider>
      <AuthStateChanged>
        <Component {...pageProps} />
      </AuthStateChanged>
    </AuthProvider>
  );
};

export default MyApp;