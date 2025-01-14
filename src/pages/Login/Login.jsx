import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { UserContext } from '../../context/User.context.jsx'

export default function Login() {
  let [emailOrPasswordError,setEmailOrPasswordError] = useState(null)

  let navigate = useNavigate()

  const passswordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/

  const validationSchema= yup.object({
    email:yup.string().email("email is invalid").required("email is required"),
    password:yup.string().matches(passswordRegex,"Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character").required("password is required"),
  })

  let {setToken}= useContext(UserContext)

  async function LoginData(values) {

    let loading = toast.loading("waiting...")
try {
  const options ={
    method:"POST",
    url:"https://ecommerce.routemisr.com/api/v1/auth/signin",
    data:values
  }
  let {data} = await axios.request(options)
  if (data.message ==="success") {
    localStorage.setItem("token",data.token)
    setToken(data.token)
    toast.success("user logged in successfully")
    setTimeout(()=>{
      navigate("/")
    },1000)  
  }
} catch (error) {
  setEmailOrPasswordError(error.response.data.message)
  toast.error(error.response.data.message)
}finally{
  toast.dismiss(loading)
}
  }

  const formik = useFormik({
    initialValues:{
      "email":"",
      "password":"",
  },
  validationSchema,
  onSubmit:LoginData
  })


  return (
    <>
    <h2 className='mb-10'>Login now :</h2>
    <form action="" className='space-y-5' onSubmit={formik.handleSubmit}>
      <div className="email">
        <input type="email" placeholder='email' className="form-control w-full capitalize"
         value={formik.values.email}
         onChange={formik.handleChange}
         onBlur={formik.handleBlur}
         name='email'
         />
        {formik.errors.email&&formik.touched.email&&<p className='flex items-center text-red-700'>*{formik.errors.email}</p>}
      </div>
      <div className="password">
        <input type="password" placeholder='password' className="form-control w-full capitalize"
         value={formik.values.password}
         onChange={formik.handleChange}
         onBlur={formik.handleBlur}
         name='password'
         />
        {emailOrPasswordError && <p className='flex items-center text-red-700'>*{emailOrPasswordError}</p> } 
        {formik.errors.password&&formik.touched.password&&<p className='flex items-center text-red-700'>*{formik.errors.password}</p>}
      </div>
      <div className="button">
      <button type='submit' className='btn bg-primary-500 hover:bg-primary-700 text-white w-full '>Login</button>
      </div>

      <div>
        <Link className='text-center underline w-full inline-block hover:text-primary-500 transition-colors duration-150 ' to="/forgetPassword">Forgrt password ?</Link>
      </div>
    </form>    
    </>
  )
}
