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

const MyApp = ({ Component, pageProps }: AppProps) => {

  const routers = useRouter();

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      const log = (url:string) => {
        analytics.then((a) => {
          if (a != null) {
            logEvent(a, 'screen_view', {
              firebase_screen: url, 
              firebase_screen_class: url
            });
          }
        })
      };

      routers.events.on('routeChangeComplete', logEvent);
      log(window.location.pathname);

      //Remvove Event Listener after un-mount
      return () => {
        routers.events.off('routeChangeComplete', logEvent);
      };
    }
  }, [routers.events]);

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
