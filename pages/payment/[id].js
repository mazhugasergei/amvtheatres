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
    await undateOccupiedSeats(router.query.id, router.query.th, router.query.d, router.query.t, router.query.s)
    window.location.href = "/complete/"
  }

  /* CHANGE FORM SECTION HEIGHT */
  useEffect(()=>{
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
          <input type="email" required onKeyDown={(e)=>{if(e.keyCode == 32) return false}}/>
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
          <button className="btn">Continue</button>
        </form>
      </main>
    </>
  )
}
 
export default Payment