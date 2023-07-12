import type { AppProps } from "next/app";
import { AuthProvider } from "@/hook/Auth";
import AuthStateChanged from "@/layout/AuthStateChanged";
import "../app/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../firebase/clientApp";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Script from "next/script";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      window.gtag(
        "config",
        process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID as string,
        {
          page_path: url,
        }
      );
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    handleRouteChange(window.location.pathname);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* gtag script code */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID as string}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
        window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', '${process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID as string}', {
            page_path: window.location.pathname
          });`,
        }}
      />
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
    </>
  );
};

export default MyApp;
