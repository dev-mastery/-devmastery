import { AppProps } from "next/app";
import AppLayout from "../components/AppLayout";
import { css, Global } from "@emotion/react";
import ThemeProvider from "../theme/ThemeProvider";
import theme from "../theme";
import "../styles/code.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Global
        styles={css`
          html,
          body {
            padding: 0;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
              Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
              sans-serif;
            font-size: 18px;
          }

          a {
            color: inherit;
            text-decoration: none;
          }

          * {
            box-sizing: border-box;
          }
        `}
      />
      <AppLayout {...pageProps}>
        <Component {...pageProps} />
      </AppLayout>
    </ThemeProvider>
  );
}
