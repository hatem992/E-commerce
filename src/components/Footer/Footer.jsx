import React from 'react'
import amazonLogo from "../../assets/images/amazon-pay.png"
import americanExpressLogo from "../../assets/images/American-Express-Color.png"
import masterCArdLogo from "../../assets/images/mastercard.webp"
import payPalLogo from "../../assets/images/paypal.png"
import appStore from "../../assets/images/get-apple-store.png"
import googlePlay from "../../assets/images/get-google-play.png"

export default function Footer() {
  return (
  <>
  <footer className='bg-slate-200 bottom-[100%] left-0 right-0 py-7 px-3 relative mt-10 '>
  <div className="container">
    <div className="text-center space-y-2">
      <h2 className='text-lg'>Get THe Fresh Cart App</h2>
      <p className='text-slate-500 text-sm'>We will send you a link, open it on your phone to download the app. </p>
    </div>

      <div className="input flex flex-col md:flex-row gap-5 my-4">
        <input type="email" placeholder='Email' className='form-control flex-grow ' />
        <button type='submit' className='btn bg-primary-600 hover:bg-primary-700 text-white text-sm w-fit mx-auto'>Share app link</button>
      </div>

    <div className='flex flex-col xlg:flex-row items-center mt-8 border-y-2 border-slate-300 py-2 space-y-3'>
      <div className="parteners flex flex-col xlg:flex-row items-center gap-5">
        <h3>Payment parteners</h3>
        <div className="parterners-logos flex flex-wrap justify-center items-center gap-4">
            <img className='w-24' src={amazonLogo} alt="amazon logo" />
            <img className='w-24' src={americanExpressLogo} alt="american express logo" />
            <img className='w-20' src={masterCArdLogo} alt="master card logo" />
            <img className='w-24' src={payPalLogo} alt="payPal logo" />
        </div>
      </div>

     <div className="downloads xlg:ml-auto flex flex-col xlg:flex-row items-center gap-5">
        <h3>Get deliveries with FreshCart</h3>
        <div className="apps flex items-center">
          <img className='w-24' src={appStore} alt="app store" />
          <img className='w-28' src={googlePlay} alt="google play" />
        </div>
     </div>

    </div>


    </div>
  </footer>

  </>
  )
}
