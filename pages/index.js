// next
import Head from "next/head"
import Link from "next/link"
import Image from "next/image"
// firebase
import { getMovies, getImages } from "../utils/firebase"
// components
import Header from "../layout/Header"
import Footer from "../layout/Footer"


export const getServerSideProps = async () => {
  const movies = await getMovies()
  const posters_urls = await getImages('amv-theatres/posters/')
  return {
    props: { movies, posters_urls }
  }
}

export default function Home({ movies, posters_urls }) {
  return (
    <>
      <Head>
        <title>AMV Theatres - movie times, buy tickets and gift cards</title>
      </Head>
      <div className="warning">
        <div className="wrapper">
          <div>This website is made as a demo for a university project. This is not a real movie tickets selling website. You will also not be able to pay&nbsp;here.</div>
          <label onClick={(e)=>{e.target.parentElement.parentElement.style.display="none"}} />
        </div>
      </div>
      <Header/>
      <main className="films-list wrapper">
        {movies.map((movie, i) => (
          <div className="card" key={i}>
            <Link href={"/details/" + movie.id}><a className="poster"><Image src={posters_urls[i]} layout="fill" priority="true"/></a></Link>
            <div className="content">
              <Link href={"/details/" + movie.id}><a className="title">{ movie.title }</a></Link>
              <div className="description">{ movie.description }</div>
              <div>{ movie.duration }<span>|</span>{ movie.rating }</div>
              <div>Released { movie.release_date }</div>
              <Link href={"/showtimes/" + movie.id}><a className="btn">Get Tickets</a></Link>
            </div>
          </div>
        ))}
      </main>
      <Footer/>
    </>
  )
}
