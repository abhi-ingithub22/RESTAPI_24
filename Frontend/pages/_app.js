import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Your Roll Number</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
