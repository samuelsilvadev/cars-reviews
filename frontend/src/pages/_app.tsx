import { useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";

import type { AppProps } from "next/app";

function App({ Component, pageProps }: AppProps): JSX.Element {
  useEffect(() => {
    const serverSideStyles = document.getElementById("jss-server-side");

    if (serverSideStyles) {
      document.head.removeChild(serverSideStyles);
    }
  }, []);

  return (
    <>
      <CssBaseline />
      <Component {...pageProps} />
    </>
  );
}

export default App;
