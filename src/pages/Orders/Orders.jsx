import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/User.context.jsx'
import Loading from '../../components/Loading/Loading.jsx'
import { Link } from 'react-router-dom'

export default function Orders() {

    let [orders,setOrders] = useState(null)
    let {token} = useContext(UserContext)
    let {id}= jwtDecode(token)

    async function getUserOrders() {
      const optoins = {
        url :`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
        method:"GET"
      }
      let {data} = await axios.request(optoins)
      setOrders(data)
      console.log(data);
    }


    useEffect(()=>{
        getUserOrders()
    },[])
  


  return (
    <>

    {orders ? 
    
    
    orders.map((order)=>
    
        <section className='mb-5'>
            <div className="order p-4 border-2 border-gray-500 border-opacity-30 rounded-md ">
                <header className='flex justify-between items-center mb-5'>
                    <div className=''>
                        <h2 className='text-gray-500'>order ID</h2>
                        <span className='font-semibold'>#{order.id}</span>
                    </div>
                    <div >
                        {order.isPaid?<span className='inline-block px-3 py-1 rounded-full bg-primary-600 text-white mr-2'>paid</span>:<span className='inline-block px-3 py-1 rounded-full bg-red-600 text-white mr-2'>not paid</span>}
                        {order.isDelivered?<span className='inline-block px-3 py-1 rounded-full bg-primary-600 text-white '>delivered</span>:<span className='inline-block px-3 py-1 rounded-full bg-blue-600 text-white '>under delivery</span>}
                    </div>
                </header>

                <div className="grid md:gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 space-y-2 md:space-y-0">
                    {order.cartItems ? order.cartItems.map((product)=>
                        <div key={product.id} className="product-item border-2 border-gray-500 border-opacity-30 rounded-md ">
                        <img  className=" w-full overflow-hidden " src={product.product.imageCover} alt={product.product.title} />

                        <div className="p-4">
                        <Link className='text-xl mt-2 line-clamp-1 mb-3 font-semibold text-gray-600' to={`/product/${product.product._id}`}>
                            {product.product.title}
                        </Link>
                        {/* <h2 ></h2> */}
                        <div className='flex justify-between'>
                            <p>
                                <span>Count : {product.count}</span>
                            </p>
                            <span>{product.price} L.E</span>
                        </div>


                        </div>
                    </div>
                    ) : <Loading/>}



                </div>

                <p className='mt-5 font-semibold'>tolal price : <span className='font-normal text-primary-800'>{order.totalOrderPrice}</span> L.E</p>
            </div>
    </section>
    
    )
    
    
  :
        
        <Loading/>}



    </>
  )
}
