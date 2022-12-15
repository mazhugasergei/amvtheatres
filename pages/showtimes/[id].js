// react
import { useState, useEffect } from "react"
// next
import Head from "next/head"
// firebase
import { getMovies, getImage } from "../../utils/firebase"
// components
import HeaderAlt from "../../layout/HeaderAlt"





export const getServerSideProps = async (context) => {
  let id = context.params.id
  let movie = await getMovies(id)

  let dates = {}
  movie.showtimes.split(", ").forEach(item => {
    // show date if it is later than now
    if(Date.parse(item) > Date.now()){
      // if current date doesn't exists create an array for current date
      if(!dates.hasOwnProperty(item.split(" ")[0])) dates[item.split(" ")[0]] = []
      // push session time to the current date
      dates[item.split(" ")[0]].push(item.split(" ")[1])
    }
  })

  let hero_url = await getImage('amv-theatres/hero/' + id + '.jpg')
  
  return{
    props: { movie, dates, hero_url }
  }
}





const Showtimes = ({ movie, dates, hero_url }) => {
  useEffect(()=>{
    /* SET DATES FIELD TOP POSITION */
    document.querySelector('.showtimes .dates').style.top = document.querySelector('header.alt').offsetHeight + "px"
    /* SET TIMES SECTION HEIGHT */
    document.querySelector('.showtimes .times').style.maxHeight = (window.innerHeight - document.querySelector('header.alt').offsetHeight - document.querySelector('.showtimes .dates').offsetHeight) + "px"
  }, [])

  /* DATE ONCHANGE HANDLER */
  const changeDate = (e) => {
    const select = document.querySelector('.showtimes .dates select')
    setSelectedDate(select.options[select.selectedIndex].value)
  }

  /* CHANGE TIMES IN TIMES SECTION */
  const theatres = movie.theatres.split(", ")
  const [selectedDate, setSelectedDate] = useState(movie.showtimes.split(", ")[0].split(" ")[0])
  useEffect(()=>{
    const list = document.querySelector('.showtimes .times')
    list.innerHTML = ""
    theatres.forEach((th, i) => {
      // creating H1 (theatre name)
      const theatre = document.createElement('h1')
      theatre.innerHTML = th
      list.appendChild(theatre)
      // creating list
      const cells = document.createElement('div')
      cells.classList.add("cells")
      list.appendChild(cells)
      dates[selectedDate].forEach((time) => {
        const time_cell = document.createElement('a')
        time_cell.href = "/seats/" + movie.id + "?th=" + th + "&d=" + selectedDate + "&t=" + time
        time_cell.innerHTML = time
        list.querySelectorAll('.cells')[i].appendChild(time_cell)
      })
    })
  }, [selectedDate])

  /* CREATE IFRAME */
  const createIFrame = (e) => {
    e.target.style.display = "none";
    const iframe = document.createElement('iframe');
    iframe.src = "https://www.youtube.com/embed/" + movie.trailer;
    iframe.frameBorder = "0";
    iframe.allowFullscreen = "allowfullscreen";
    iframe.allow = "autoplay";
    e.target.parentElement.appendChild(iframe);
  }

  return (
    <>
      <Head>
        <title>{ movie.title } Times at AMV Theatres</title>
      </Head>
      <HeaderAlt title={ "Select Session" } />
      <main className="showtimes">
        <section className="dates">
          <select onChange={changeDate}>{
            Object.entries(dates).map((key, i) => {
              const date = new Date(key[0])
              const options = { weekday: 'short', month: 'short', day: 'numeric' }
              return ( <option value={key[0]} key={i}>{ date.toLocaleDateString('en-US', options) }</option> )
            })
          }</select>
        </section>
        <section className="video_times wrapper">
          <div className="details">
            <div className="video">
              <div className="preview" onClick={createIFrame} style={{ backgroundImage: "url('" + hero_url + "')" }}>
                <button aria-label="play the video" aria-hidden="hidden"><svg focusable="false" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 45 45" preserveAspectRatio="xMidYMid meet" fill="#ffffff" width="100%" height="100%"><path d="M22.5 0A22.5 22.5 0 1 0 45 22.5 22.5 22.5 0 0 0 22.5 0zm0 43.172A20.672 20.672 0 1 1 43.172 22.5 20.672 20.672 0 0 1 22.5 43.172z"></path><path d="M19.181 13.331a.9.9 0 0 0-1.462.732v16.874a.9.9 0 0 0 1.462.732l11.616-8.438a.9.9 0 0 0 0-1.49zm.506 15.806V15.864l9 6.637z"></path></svg></button>
              </div>
            </div>
            <h2>{ movie.title }</h2>
            <div>{ movie.duration }<span>|</span>{ movie.rating }</div>
          </div>
          <div className="times"></div>
        </section>
      </main>
    </>
  )
}
 
export default Showtimes