import { useRouter } from "next/router"
import { useState, useEffect } from "react"

const Loader = () => {
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  useEffect(() => {
      const handleStart = (url) => {
        if(url !== router.asPath){
          setLoading(true)
          document.body.style.overflow = "hidden"
        }
      }
      const handleComplete = (url) => {
        if(url === router.asPath){
          setLoading(false)
          document.body.style.overflow = "unset"
        }
      }

      router.events.on('routeChangeStart', handleStart)
      router.events.on('routeChangeComplete', handleComplete)
      router.events.on('routeChangeError', handleComplete)

      return () => {
          router.events.off('routeChangeStart', handleStart)
          router.events.off('routeChangeComplete', handleComplete)
          router.events.off('routeChangeError', handleComplete)
      }
  })
  
  return loading && (<div className="loader"><div className="loading-bar"></div></div>)
}

export default Loader