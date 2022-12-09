// style
import '../styles/index.css'
// next
import Head from 'next/head'
// components
import Loader from '../layout/Loader'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" type="image/svg" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <meta name="description" content="Find movies near you, view show times, watch movie trailers and buy movie tickets. AMV Theatres has the newest movies near you." />
      </Head>
      <Loader/>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp