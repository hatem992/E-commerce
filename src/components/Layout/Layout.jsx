import React from 'react'
import Navbar from '../Navbar/Navbar.jsx'
import Footer from '../Footer/Footer.jsx'
import { Outlet } from 'react-router-dom'





export default function () {
 return (
    <div className='min-h-screen flex flex-col'>
        <Navbar/>
        <div className="container mt-24 flex-grow w-11/12 mx-auto sm:w-full">
          <Outlet></Outlet>
        </div>
        <Footer/>

    </div>
  )
}
