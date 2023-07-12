import type { AppProps } from "next/app";
import { AuthProvider } from "@/hook/Auth";
import AuthStateChanged from "@/layout/AuthStateChanged";
import "../app/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {analytics} from "../../firebase/clientApp";
import { useEffect } from "react";
import { useRouter } from 'next/router';
import { logEvent } from "firebase/analytics";

const log = (url: string) => {
  analytics
    .then((a) => {
      if (a !== null) {
        logEvent(a, 'screen_view', {
          firebase_screen: url,
          firebase_screen_class: url,
        });
      }
    })
    .catch((error) => {
      console.log('Failed to log event:', error);
    });
};

const MyApp = ({ Component, pageProps }: AppProps) => {

  const router = useRouter();

  useEffect(() => {
    console.log(process.env.NODE_ENV)
    if (process.env.NODE_ENV === 'production') {
      log(window.location.pathname);
      console.log(window.location.pathname);
      console.log('goes here')

      const handleRouteChange = (url:string) => {
        log(url);
      };

      router.events.on('routeChangeComplete', handleRouteChange);

      return () => {
        router.events.off('routeChangeComplete', handleRouteChange);
      };
    }
  }, [router.events]);

  return (
    <AuthProvider>
      <AuthStateChanged>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Component {...pageProps} />
      </AuthStateChanged>
    </AuthProvider>
  );
};

export default MyApp;
