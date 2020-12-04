import AppLayout from "../components/AppLayout";

export default function MyApp({ Component, pageProps }) {
  return (
    <AppLayout {...pageProps}>
      <Component {...pageProps} />
    </AppLayout>
  );
}

export async function getStaticProps() {
  return { props: { foo: "bar" } };
}
