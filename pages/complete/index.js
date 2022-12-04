// next
import Head from "next/head"
import Link from "next/link"

const Complete = () => {
  return (
    <>
      <Head>
        <title>Done! See you in our theatre!</title>
      </Head>
      <main className="complete wrapper">
        <h1>Done!</h1>
        <h3>Check your Email (not available yet) and see you in our&nbsp;theatre!</h3>
        <Link href="/"><a className="btn">Home</a></Link>
      </main>
    </>
  )
}
 
export default Complete