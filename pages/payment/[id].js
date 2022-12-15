// react
import { useEffect } from "react"
// next
import { useRouter } from "next/router"
import Head from "next/head"
// firebase
import { undateOccupiedSeats } from "../../utils/firebase"
// components
import HeaderAlt from "../../layout/HeaderAlt"



const Payment = () => {
  const router = useRouter()

  const formSubmit = async (e) => {
    e.preventDefault()
    const btn = document.querySelector('.payment .btn')
    btn.style.width = btn.offsetWidth + "px"
    btn.style.height = btn.offsetHeight + "px"
    btn.innerHTML = ""
    btn.appendChild(document.createElement('div'))
    await undateOccupiedSeats(router.query.id, router.query.th, router.query.d, router.query.t, router.query.s)
    window.location.href = "/complete/"
  }

  useEffect(()=>{
    /* CHANGE FORM SECTION HEIGHT */
    document.querySelector('.payment').style.height = window.innerHeight - document.querySelector('header.alt').offsetHeight - 1 + "px"
  }, [])

  return (
    <>
      <Head>
        <title>Ticket Purchasement at AMV Theatres</title>
      </Head>
      <HeaderAlt title={ "Payment Details" } />
      <main className="payment wrapper">
        <form onSubmit={formSubmit}>
          <span>Email</span>
          <input type="email" required onSubmit={(e)=>{ e.target.value = e.target.value.trim() }}/>
          <span>Card Number</span>
          <input type="text" disabled />
          <span>Name</span>
          <input type="text" disabled />
          <div>
            <span>Valid Thru</span>
            <span>CVV</span>
            <input type="text" disabled />
            <input type="text" disabled />
          </div>
          <button className="btn" accessKey="C">Continue</button>
        </form>
      </main>
    </>
  )
}
 
export default Payment