import type { AppProps } from "next/app";
import { AuthProvider } from "@/hook/Auth";
import AuthStateChanged from "@/layout/AuthStateChanged";
import "../app/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../firebase/clientApp";
import { initGA, logPageView } from "@/service/ga";
import { useEffect } from "react";
import { useRouter } from "next/router";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  useEffect(() => {
    initGA();
    logPageView();
  }, []);

  useEffect(() => {
    const handleRouteChange = (url:string) => {
      logPageView();
    };

    // Event listener for route changes
    router.events.on('routeChangeComplete', handleRouteChange);

    // Cleanup the event listener on unmount
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
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
