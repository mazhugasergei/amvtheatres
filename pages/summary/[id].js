// react
import { useEffect } from "react"
// next
import { useRouter } from "next/router"
import Head from "next/head"
import Link from "next/link"
// firebase
import { getMovies, getImage } from "../../utils/firebase"
// components
import HeaderAlt from "../../layout/HeaderAlt"
import HeaderDetails from "../../layout/HeaderDetails"





export const getServerSideProps = async (context) => {
  let id = context.params.id
  let movie = await getMovies(id)
  let poster_url = await getImage('amv-theatres/posters/' + id + '.jpg')

  return{
    props: { movie, poster_url }
  }
}





const Summary = ({ movie, poster_url }) => {
  const router = useRouter()

  /* CHANGE CHECKOUT SECTION HEIGHT */
  useEffect(()=>{
    document.querySelector('.summary .checkout').style.height = window.innerHeight - document.querySelector('header.alt').offsetHeight - document.querySelector('header.details').offsetHeight - document.querySelector('.summary .purchase').offsetHeight - 1 + "px"
  }, [])

  return (
    <>
      <Head>
        <title>{ movie.title } Seats at AMV Theatres</title>
      </Head>
      <HeaderAlt title={ "Summary" } />
      <HeaderDetails poster_url={poster_url} title={movie.title} theatre={router.query.th} date={router.query.d} time={router.query.t} />
      <main className="summary">
        <div className="checkout wrapper">
          <h2>Order Details</h2>
          <ul>
            <li>
              <div>Film</div>
              <div>{ movie.title }</div>
            </li>
            <li>
              <div>Date</div>
              <div>{ router.query.d }</div>
            </li>
            <li>
              <div>Theatre</div>
              <div>{ router.query.th }</div>
            </li>
            <li>
              <div>Time</div>
              <div>{ router.query.t }</div>
            </li>
            <li>
              <div>Seats</div>
              <div>{
                router.query.s.split(',').map((seat, i) => (
                  <span key={i}>
                    <span>{ seat }</span><span>${ movie.price }</span>
                  </span>
                ))
              }</div>
            </li>
          </ul>
          <div className="total">Order Total: <span>${ movie.price * router.query.s.split(',').length }</span></div>
        </div>
        <div className="purchase">
          <div className="wrapper">
            <Link href={"/payment/" + movie.id + "?th=" + router.query.th + "&d=" + router.query.d + "&t=" + router.query.t + "&s=" + router.query.s}><a className="btn" accessKey="P">Purchase</a></Link>
          </div>
        </div>
      </main>
    </>
  )
}
 
export default Summary