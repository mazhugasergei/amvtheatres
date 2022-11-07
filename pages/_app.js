// style
import '../styles/main.css'
// loader
import Loader from '../layout/Loader'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Loader/>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
