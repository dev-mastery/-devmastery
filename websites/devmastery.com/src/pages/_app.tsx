import { AppProps } from "next/app";
import AppLayout from "../components/AppLayout";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppLayout {...pageProps}>
      <Component {...pageProps} />
    </AppLayout>
  );
}
