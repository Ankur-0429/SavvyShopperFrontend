import type { AppProps } from "next/app";
import { AuthProvider } from "@/hook/Auth";
import AuthStateChanged from "@/layout/AuthStateChanged";
import "../app/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AsyncListProvider } from "@/hook/AsyncList";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
      <AuthStateChanged>
        <AsyncListProvider>
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
        </AsyncListProvider>
      </AuthStateChanged>
    </AuthProvider>
  );
};

export default MyApp;
