// next
import Image from "next/image"



const HeaderDetails = ({ poster_url, title, theatre, date, time }) => {

  /* DATE FORMAT */
  const date_obj = new Date(date)
  const options = { month: 'short', day: 'numeric', year: "numeric" }
  const formated_date = date_obj.toLocaleDateString('en-US', options)

  return (
    <header className="details">
      <div className="wrapper">
        <div className="poster"><Image src={poster_url} layout="fill" priority="true"/></div>
        <div className="details">
          <h1>{ title }</h1>
          <div>{ theatre }<span>|</span>{ formated_date }<span>|</span>{ time }</div>
        </div>
      </div>
    </header>
  )
}
 
export default HeaderDetails