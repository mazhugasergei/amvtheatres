// react
import { useEffect, useState } from "react"
// next
import { useRouter } from "next/router"
import Head from "next/head"
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





const Seats = ({ movie, poster_url }) => {
  const router = useRouter()

  /* DEFINE SEATS' ROWS AND COLUMNS */
  const alpha = Array.from(Array(6)).map((e, i) => i + 65)
  const alphabet = alpha.map((x) => String.fromCharCode(x))
  const seatsNums = Array.from(Array(16)).map((e, i) => i + 1)

  /* CHANGE HALL SECTION HEIGHT */
  useEffect(()=>{
    document.querySelector('.seats .hall').style.height = window.innerHeight - document.querySelector('header.alt').offsetHeight - document.querySelector('header.details').offsetHeight - document.querySelector('.seats .continue').offsetHeight - document.querySelector('.seats .types').offsetHeight - 1 + "px"
  }, [])

  /* RECORD SEATS SELECTING */
  const [selectedSeats, setSelectedSeats] = useState([])
  const seatClick = (e) => {
    let seats = [...selectedSeats]
    if(selectedSeats.includes(e.target.innerText)) seats.splice(seats.indexOf(e.target.innerText), 1)
    else seats.push(e.target.innerText)
    setSelectedSeats([...seats])
  }
  useEffect(()=>{
    if(selectedSeats.length){
      document.querySelector('.seats .continue .btn').classList.remove('disabled')
      document.querySelector('.seats .continue .wrapper div').style.opacity = 1
      document.querySelector('.seats .continue span').innerText = selectedSeats.length
      if(selectedSeats.length != 1) document.querySelectorAll('.seats .continue span')[1].innerText = 's'
      else document.querySelectorAll('.seats .continue span')[1].innerText = ''
    }
    else{
      document.querySelector('.seats .continue .btn').classList.add('disabled')
      document.querySelector('.seats .continue .wrapper div').style.opacity = 0
    }
    document.querySelector('.seats .continue a').href = "/summary/" + movie.id + "?th=" + router.query.th + "&d=" + router.query.d + "&t=" + router.query.t + "&s=" + selectedSeats.toString()
  }, [selectedSeats])

  /* ADD BUTTON LOADING ANIMATION */
  useEffect(()=>{
    const btn = document.querySelector('.continue .btn')
    btn.addEventListener("click", ()=>{
      if(!btn.classList.contains('disabled')){
        btn.style.width = btn.offsetWidth + "px"
        btn.style.height = btn.offsetHeight + "px"
        btn.innerHTML = ""
        btn.appendChild(document.createElement('div'))
      }
    })
  }, [])

  return (
    <>
      <Head>
        <title>{ movie.title } Seats at AMV Theatres</title>
      </Head>
      <HeaderAlt title={ "Select Seats" } />
      <HeaderDetails poster_url={poster_url} title={movie.title} theatre={router.query.th} date={router.query.d} time={router.query.t} />
      <main className="seats">
        <div className="hall wrapper">
          <div className="screen">SCREEN</div>
          <div className="seats">{
            alphabet.map(letter => (
              seatsNums.map(num => (
                <div key={letter+num}>
                  <input type="checkbox" id={letter+num} autoComplete="off" />
                  <label htmlFor={letter+num}
                    style={{
                      marginInlineEnd: num == 4? "20px" : "unset",
                      marginInlineStart: num == 13? "20px" : "unset",
                      borderRadius: letter == "F" && (num == 4 || num == 5 || num == 8 || num == 9 || num == 12 || num == 13)? "50%" : "20%",
                      opacity: movie.hasOwnProperty('occupied_seats') && movie.occupied_seats.includes(router.query.th+"_"+router.query.d+"_"+router.query.t+"_"+letter+num)? ".4" : "unset",
                      pointerEvents: movie.hasOwnProperty('occupied_seats') && movie.occupied_seats.includes(router.query.th+"_"+router.query.d+"_"+router.query.t+"_"+letter+num)? "none" : "unset"
                    }}
                    onClick={seatClick}
                  >{ letter + num }</label>
                </div>
              ))
            ))
          }</div>
        </div>
        <div className="types wrapper">
          <ul>
            <li><div/>Traditionsl</li>
            <li><div/>Wheelchair</li>
          </ul>
          <ul>
            <li><div/>Available</li>
            <li><div/>Selected</li>
            <li><div/>Occupied</li>
          </ul>
        </div>
        <div className="continue">
          <div className="wrapper">
            <div className="selectedNum"><span/> seat<span/> selected</div>
            <a className="btn white disabled" href="">Continue</a>
          </div>
        </div>
      </main>
    </>
  )
}
 
export default Seats