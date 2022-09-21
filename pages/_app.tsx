import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { Session } from "next-auth";
import { ThemeProvider, createTheme } from "@mui/material";
import { SessionProvider } from "next-auth/react";
import store from "../redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
let persistor = persistStore(store);

const font = "Quicksand";
const theme = createTheme({
  typography: {
    fontFamily: font,
  },
});

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
}>) {
  return (
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
        <SessionProvider session={pageProps.session}>
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </SessionProvider>
      </Provider>
    </PersistGate>
  );
}

export default MyApp;
