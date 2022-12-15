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
  const warningDisappear = (e) => {
    const cont = e.target.parentElement.parentElement
    cont.style.transform="translateY(-100%)"
    cont.style.marginBottom= -1 * cont.offsetHeight + "px"
    e.target.tabIndex = -1
  }

  return (
    <>
      <Head>
        <title>AMV Theatres - movie times, buy tickets and gift cards</title>
      </Head>
      <div className="warning">
        <div className="wrapper">
          <div>This website is made as a demo for a university project. This is not a real movie tickets selling&nbsp;website.</div>
          <button onClick={warningDisappear} accessKey="X" aria-label="Close warning message" />
        </div>
      </div>
      <Header/>
      <main className="films-list wrapper" aria-hidden="hidden">
        {movies.map((movie, i) => (
          <div className="card" key={i}
            onFocus={()=>{
              document.querySelector('header #menuBtn').checked = false
              document.body.style.overflow = "unset"
            }}
          >
            <Link href={"/details/" + movie.id}><a aria-label={movie.title}></a></Link>
            <div className="poster"><Image src={posters_urls[i]} layout="fill" priority="true"/></div>
            <div className="content">
              <a className="title">{ movie.title }</a>
              <div className="description">{ movie.description }</div>
              <div>{ movie.duration }<span>|</span>{ movie.rating }</div>
              <div>Released { movie.release_date }</div>
            </div>
          </div>
        ))}
      </main>
      <Footer/>
    </>
  )
}
