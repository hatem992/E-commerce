import React, { useContext, useEffect, useState } from 'react'
import { WhishlistContext } from '../../context/Whishlist.context.jsx'
import Loading from '../../components/Loading/Loading.jsx'
import WhishlistItem from '../../components/WhishlistItem/WhishlistItem.jsx'
import { Link } from 'react-router-dom'

export default function Whishlist() {
    let {getWhishlist,wishlistInfo } =useContext(WhishlistContext)
    useEffect(()=>{
      getWhishlist()
    },[])

    // useEffect(()=>{
    //   getWhishlist()
    // },[wishlistInfo])

  return (
    <>

        <div className="header flex gap-4 items-center mb-7">
            <i className="fa-brands fa-opencart text-3lg"></i>
            <h2 className="before:h-full before:w-[2px] before:absolute before:-left-2 before:bg-slate-500 ml-3 relative font-semibold text-slate-500  ">Your whishlist</h2>
        </div>
    
     {wishlistInfo ? 
     
     <section>
      {wishlistInfo.count === 0 ?
       <div className='bg-gray-200 rounded-md text-center py-10 space-y-2  '>
            <p className='mb-5'>there is no products in your whishlist</p>
            <Link to="/">
                <button className='bg-primary-600 px-4 py-2 rounded-md text-white'>
                    Go To Home
                </button>
            </Link>
        </div> : <>{wishlistInfo?.data.map((product)=><WhishlistItem WhishlistItemInfo={product} key={product.id}/>)}</> }
     </section>
     
     : <Loading/>}
    
    
    </>
   
  )
}
