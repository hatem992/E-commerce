import { useFormik } from 'formik'
import * as yup from 'yup'
import React, { useContext, useState } from 'react'
import { CartContext } from '../../context/Cart.context.jsx'
import axios from 'axios'
import { UserContext } from '../../context/User.context.jsx'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function Checkout() {

  const phoneRegex = /^(20)?01[0125][0-9]{8}$/

  const validationSchema = yup.object({
    shippingAddress:yup.object({
      city:yup.string().required("city is required"),
      phone:yup.string().matches(phoneRegex,"must be an egyption number").required("phone is required"),
      details:yup.string().max(300,"maximum num of letters is 300")
    })

  })

  let [paymentMethod,setPaymentMethod] = useState(null)
  let{cartInfo}=useContext(CartContext)
  let{token}=useContext(UserContext)
  let navigate = useNavigate()

  async function createrCashOrder(values) {
    let toastId = toast.loading("we are creating your order ...")
try {
  const options = {
    url:`https://ecommerce.routemisr.com/api/v1/orders/${cartInfo.cartId}`,
    method:"POST",
    headers:{
      token
    },
    data:values
  }
  let{data} = await axios.request(options)
  
  if (data.status === "success") {
      toast.success("success")
  setTimeout(()=>{
    navigate("/allOrders")
  },2000)
  }

} catch (error) {
  console.log(error);
}finally{
  toast.dismiss(toastId)
}
    
  }

  async function createOnlineOrder(values) {
    let toastId = toast.loading("redirecting you to the payment page")
    try {
      const options = {
        url:`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartInfo.cartId}?url=${location.origin}`,
        method:"POST",
        headers:{
          token
        },
        data:values
      }
      let{data} = await axios.request(options)
      if (data.status === "success") {
        setTimeout(()=>{
          location.href = data.session.url
        },2000)
      }
    } catch (error) {
      console.log(error);
    }finally{
      toast.dismiss(toastId)
    }
  }

  const formik = useFormik({
    initialValues:{
      "shippingAddress":{
          "details": "",
          "phone": "",
          "city": ""
          }
      },
      validationSchema,
      onSubmit: (values)=>{
        if (paymentMethod === "cash") createrCashOrder(values)
        else createOnlineOrder(values)
      }

  })

  return (
    <>
      <section>
        <h2 className='mb-10 text-xl font-semibold text-gray-600'>Shipping address</h2>
        <form action='' className='space-y-3'onSubmit={formik.handleSubmit} >
          <div className="city">
            <input type="text" placeholder='City' className='form-control w-full'
              value={formik.values.shippingAddress.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name='shippingAddress.city'
            />
            {formik.errors.shippingAddress?.city&&formik.touched.shippingAddress?.city&&<p className='flex items-center text-red-700'>*{formik.errors.shippingAddress?.city}</p>}
          </div>
          <div className="Phone">
            <input type="tel" placeholder='Phone' className='form-control w-full'
              value={formik.values.shippingAddress.phone}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              name='shippingAddress.phone'
            />
            {formik.errors.shippingAddress?.phone&&formik.touched.shippingAddress?.phone&&<p className='flex items-center text-red-700'>*{formik.errors.shippingAddress?.phone}</p>}
          </div>
          <div className="details">
            <textarea type="text" placeholder='Details' className='form-control w-full'
              value={formik.values.shippingAddress.details}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name='shippingAddress.details'
            ></textarea>
            {formik.errors.shippingAddress?.details&&formik.touched.shippingAddress?.details&&<p className='flex items-center text-red-700'>*{formik.errors.shippingAddress?.details}</p>}
          </div>
          <button onClick={()=>{
            setPaymentMethod("cash")
          }} type='submit' className='btn mr-2 text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-150'>Cash Order</button>
          <button onClick={()=>{
            setPaymentMethod("Online")
          }}  type='submit' className='btn text-white bg-primary-600 hover:bg-primary-700 transition-colors duration-150'>Online Payment</button>
        </form>
      </section>
    
    </>

  )
}
