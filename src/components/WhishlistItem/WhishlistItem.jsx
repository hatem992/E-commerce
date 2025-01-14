import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../context/Cart.context.jsx'
import { WhishlistContext } from '../../context/Whishlist.context.jsx'
import { Link } from 'react-router-dom'

export default function WhishlistItem({WhishlistItemInfo}) {

    let [isLoadind,setLoading]=useState(false)    

    const {imageCover,price,title,id,category} = WhishlistItemInfo
    const {name} = category



    const{deleteFromWhishlist} = useContext(WhishlistContext)
    const {addProductToCart} = useContext(CartContext)
  return (
    <>
<div className='flex gap-2'>
<div className="flex space-y-5 flex-col sm:flex-row  items-center px-5 py-2 flex-grow  bg-gray-200 mb-2 rounded-md ">
    <img className='w-20 h-20 object-cover rounded-full ' src={imageCover} alt={title} />
   
   <div className='flex  justify-around items-center w-full'>
    <Link to={`/product/${id}`} className='w-1/4 text-center line-clamp-1'>{title}</Link>
    <Link to={`/categories/${category._id}`} className='w-1/4 text-center line-clamp-2'>{name}</Link>
    <h3 >{price} L.E</h3>
   </div>
   
    <button onClick={()=>{
        addProductToCart({productId:id})
    }}
   className='btn mt-5 md:mt-0 text-white bg-primary-600 hover:bg-primary-700 transition-colors duration-150'>add to cart</button>
   


</div>
<button
disabled={isLoadind}
    onClick={()=>{
        setLoading(true)



        deleteFromWhishlist({productId:id}).then(()=>{
            setLoading(false)
        })
    }}
className=" mb-2 bg-gray-200 hover:bg-gray-300 transition-colors duration-100 outline-none rounded-md flex justify-center items-center p-2 ">       

    
    {isLoadind ?<i className='fa-solid fa-spinner fa-spin text-white text-sm'></i>:<i className="fa-solid fa-xmark"></i> }


</button>
</div>
    </>
  )
}
