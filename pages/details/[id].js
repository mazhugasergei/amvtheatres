// react
import { useEffect, useState } from "react"
// next
import Head from "next/head"
import Link from "next/link"
// firebase
import { getMovies, getImage, getImages } from "../../utils/firebase"
// components
import Header from "/layout/Header"
import Footer from "/layout/Footer"





export const getServerSideProps = async (context) => {
  let id = context.params.id
  let movie = await getMovies(id)
  let hero_url = await getImage('amv-theatres/hero/' + id + '.jpg')
  let screenshots_urls = await getImages('amv-theatres/screenshots/' + id)
  return{
    props: { movie, hero_url, screenshots_urls }
  }
}





const Details = ({ movie, hero_url, screenshots_urls }) => {

  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(()=>{
    // slides
    document.querySelectorAll('.details .carousel .slide').forEach(slide => {slide.style.cursor = "pointer"})
    document.querySelectorAll('.details .carousel .slide')[currentSlide].style.cursor = "default"
    // change nav inputs
    const inputs = document.querySelectorAll('.details .carousel input')
    inputs[currentSlide].checked = true
  }, [currentSlide])

  const scrollSlides = () => {
    const slideWidth = document.querySelector('.details .carousel .slide').offsetWidth
    const padding = parseInt(window.getComputedStyle(document.querySelector('.details .carousel .slides'), null).getPropertyValue('padding-left'))
    const slidesGap = document.querySelectorAll('.details .carousel .slide')[1].offsetLeft - slideWidth - padding
    let scrollLeft = document.querySelector('.details .carousel .slides').scrollLeft
    setCurrentSlide(Math.floor((scrollLeft + slideWidth/2 + slidesGap/2)/(slideWidth + slidesGap)))
  }
  
  const moveSlides = (e) => {
    const i = e.target.dataset.index
    setCurrentSlide(i)
    const slideWidth = document.querySelector('.details .carousel .slide').offsetWidth
    const padding = parseInt(window.getComputedStyle(document.querySelector('.details .carousel .slides'), null).getPropertyValue('padding-left'))
    const slidesGap = document.querySelectorAll('.details .carousel .slide')[1].offsetLeft - slideWidth - padding
    // set scroll position
    document.querySelector('.details .carousel .slides').scrollLeft = document.querySelectorAll('.details .carousel .slide')[i].offsetLeft - slidesGap;
  }


  return (
    <>
      <Head>
        <title>{ movie.title } at AMV Theatre near you</title>
      </Head>
      <Header/>
      <main className="details">
        <div className="hero" style={{backgroundImage: "url('" + hero_url + "')"}} loading="lazy">
          <div className="wrapper">
            <h1 className="title">{ movie.title }</h1>
            <Link href={"/showtimes/" + movie.id}><a className="btn">Get Tickets</a></Link>
          </div>
        </div>

        <div className="wrapper">
          { movie.hasOwnProperty('headline') && ( <h1 className="headline">{ movie.headline }</h1> ) }
          <div className="about">
            <div className="decription">{ movie.description }</div>
            <div className="details">
              <div>{ movie.duration }<span>|</span>{ movie.rating }</div>
              <div>{ movie.release_date }</div>
              <div>{ movie.genre }</div>
            </div>
          </div>
        </div>

        <div className="carousel">
          <div className="slides" onScroll={scrollSlides}>
            { screenshots_urls.map((url, i) => ( <div className="slide" onClick={moveSlides} data-index={i} style={{backgroundImage: "url('"+url+"')"}} key={i}></div> )) }
          </div>
          <nav>
            { screenshots_urls.map((ulr, i) => (
              <div key={i}>
                <input type="radio" name="carousel-input" id={"input_" + i} defaultChecked={i == 0}/>
                <label htmlFor={"input_" + i} onClick={moveSlides} data-index={i}/>
              </div>
            )) }
          </nav>
        </div>

        <div className="ppl wrapper">
          <h1>Cast & Crew</h1>
          <ul>{
            movie.ppl.map((person, i) => (
              <li key={i}>
                <div>{person.split("//")[0]}</div>
                <div>{person.split("//")[1]}</div>
              </li>
            ))
          }</ul>
        </div>
      </main>
      <Footer/>
    </>
  )
}
 
export default Details