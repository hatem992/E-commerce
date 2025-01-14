import React, { useContext, useEffect } from 'react'
import { CartContext } from '../../context/Cart.context.jsx'
import Loading from '../../components/Loading/Loading.jsx'
import CartItem from '../../components/cartItem/CartItem.jsx'
import { Link } from 'react-router-dom'

export default function Cart() {

    let {cartInfo,getCartProducts,clearCart} =useContext(CartContext)
    useEffect(()=>{
        getCartProducts()
    },[])

  return (
<>         
        <div className="header flex gap-4 items-center mb-7">
            <i className="fa-brands fa-opencart text-3lg"></i>
            {/* <img className="w-10 h-10" src="" alt="cart logo" /> */}
            <h2 className="before:h-full before:w-[2px] before:absolute before:-left-2 before:bg-slate-500 ml-3 relative font-semibold text-slate-500  ">Your Shopping Cart</h2>
        </div>

        {cartInfo === null ? <Loading/> : 
        <section>
        {cartInfo.numOfCartItems === 0 ? 
        
        <div className='bg-gray-200 rounded-md text-center py-10 '>
            <p className='mb-5 px-3'>there is no products in your cart , start shopping now</p>
            <Link to="/">
                <button className='bg-primary-600 px-4 py-2 rounded-md text-white'>
                    Go To Home
                </button>
            </Link>
        </div>
        :
        <>
        <div className='space-y-2'>
            {cartInfo.data.products.map((product)=><CartItem cartItemsInfo={product} key={product._id}/>)}
        </div>
        <div className="footer flex flex-col sm:flex-row justify-between mt-9 space-y-5 ">
                <div className='total-cost flex items-center space-x-2 '>
                <i class="fa-solid fa-sack-dollar text-2xl text-primary-800 mr-2"></i>
                <p> Your Total Price Is <span className='text-primary-800 font-semibold'>{cartInfo.data.totalCartPrice}</span> L.E</p>
                </div>
                <button onClick={clearCart} className='bg-red-600 rounded-md text-white px-5 py-2 hover:bg-red-700 transition-colors duration-100'><i class="fa-solid fa-trash text-white mr-2"></i>clear cart</button>
        </div>
        <Link to="/Checkout" className='btn inline-block text-white bg-primary-600 w-full my-5 text-center hover:bg-primary-700 transition-colors duration-150'>Pay</Link>
        </>
        }

    </section>}
</>
)
}
