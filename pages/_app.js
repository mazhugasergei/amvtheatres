// style
import '../styles/main.css'
// next
import Head from 'next/head'
// components
import Loader from '../layout/Loader'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Loader/>
      <Head>
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
