// next
import Link from "next/link"



const Header = () => {
  const menuBtn = () => {
    if(document.querySelector('#menuBtn').checked) document.body.style.overflow = "hidden"
    else document.body.style.overflow = "unset"
  }

  return (
    <header>
      <div className="wrapper">
        <input type="checkbox" id="menuBtn" onClick={menuBtn}/>
        <label htmlFor="menuBtn"><div/><div/><div/></label>
        <Link href="/"><a className="logo" aria-label="ANV theatres logo"><div aria-hidden="true">amv</div><div aria-hidden="true">theatres</div></a></Link>
        <ul className="wrapper">
          <li><a href="/"><span>See a movie</span> <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 45 45" preserveAspectRatio="xMidYMid meet" fill="#ffffff" width="100%" height="100%"> <path d="M29.6 22.543l-19.31 19.31a2.085 2.085 0 0 0 2.857 2.856l20.767-20.766a2.085 2.085 0 0 0 0-2.857L13.233.291a2.085 2.085 0 0 0-2.857 2.856z"></path></svg></a></li>
          <li><a href="/"><span>Our theatres</span> <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 45 45" preserveAspectRatio="xMidYMid meet" fill="#ffffff" width="100%" height="100%"> <path d="M29.6 22.543l-19.31 19.31a2.085 2.085 0 0 0 2.857 2.856l20.767-20.766a2.085 2.085 0 0 0 0-2.857L13.233.291a2.085 2.085 0 0 0-2.857 2.856z"></path></svg></a></li>
          <li><a href="/"><span>Food & drinks</span> <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 45 45" preserveAspectRatio="xMidYMid meet" fill="#ffffff" width="100%" height="100%"> <path d="M29.6 22.543l-19.31 19.31a2.085 2.085 0 0 0 2.857 2.856l20.767-20.766a2.085 2.085 0 0 0 0-2.857L13.233.291a2.085 2.085 0 0 0-2.857 2.856z"></path></svg></a></li>
          <li><a href="/"><span>On demand</span> <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 45 45" preserveAspectRatio="xMidYMid meet" fill="#ffffff" width="100%" height="100%"> <path d="M29.6 22.543l-19.31 19.31a2.085 2.085 0 0 0 2.857 2.856l20.767-20.766a2.085 2.085 0 0 0 0-2.857L13.233.291a2.085 2.085 0 0 0-2.857 2.856z"></path></svg></a></li>
          <li><a href="/"><span>Extras</span> <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 45 45" preserveAspectRatio="xMidYMid meet" fill="#ffffff" width="100%" height="100%"> <path d="M29.6 22.543l-19.31 19.31a2.085 2.085 0 0 0 2.857 2.856l20.767-20.766a2.085 2.085 0 0 0 0-2.857L13.233.291a2.085 2.085 0 0 0-2.857 2.856z"></path></svg></a></li>
          <li><a href="/"><span>Gift cards</span> <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 45 45" preserveAspectRatio="xMidYMid meet" fill="#ffffff" width="100%" height="100%"> <path d="M29.6 22.543l-19.31 19.31a2.085 2.085 0 0 0 2.857 2.856l20.767-20.766a2.085 2.085 0 0 0 0-2.857L13.233.291a2.085 2.085 0 0 0-2.857 2.856z"></path></svg></a></li>
        </ul>
        <i><svg focusable="false" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" id="icon_search" viewBox="0 0 45 45" preserveAspectRatio="xMidYMid meet" fill="#ffffff" width="100%" height="100%"><path d="M37.151 17.176A17.176 17.176 0 1 0 19.976 34.35 17.204 17.204 0 0 0 37.15 17.176zM19.976 32.27A15.095 15.095 0 1 1 35.07 17.176 15.095 15.095 0 0 1 19.976 32.27zm13.493.393a1.05 1.05 0 0 0-1.63 1.322l8.573 10.625a1.05 1.05 0 1 0 1.63-1.32z"></path></svg></i>
      </div>
    </header>
  )
}
 
export default Header