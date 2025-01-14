import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'

export default function Signup() {

  const [emailExistError,setEmailExistError] = useState(null)

  let navigate = useNavigate()

  const passswordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
  const phoneRegex = /^(20)?01[0125][0-9]{8}$/

  const validationSchema= yup.object({
    name:yup.string().required("name is required").min(2,"name must be more than two characters").max(30,"name must be less than 30 chatacters"),
    email:yup.string().email("email is invalid").required("email is required"),
    password:yup.string().matches(passswordRegex,"Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character").required("password is required"),
    rePassword:yup.string().oneOf([yup.ref("password")],"Re-password must match the password").required("repassword is required"),
    phone:yup.string().matches(phoneRegex,"must be an egyption number").required("phone is required")
  })


  async function registerData(values) {
    let loading = toast.loading("waiting ...")
try {
  const options ={
    method:"POST",
    url:"https://ecommerce.routemisr.com/api/v1/auth/signup",
    data:values
  }
  let {data} = await axios.request(options)
  if (data.message ==="success") {
    toast.success("user created successfully")
    setTimeout(()=>{
      navigate("/login")
    },1000)  
  }
} catch (error) {
  toast.error(error.response.data.message)
  setEmailExistError(error.response.data.message)
}finally{
  toast.dismiss(loading)
}
    
  }

  const formik = useFormik({
    initialValues:{
      "name": "",
      "email":"",
      "password":"",
      "rePassword":"",
      "phone":""
  },
  validationSchema,
  onSubmit:registerData
  })


  return (
    <>
    
    <h2 className='mb-10'>Register now :</h2>

    <form action="" className='space-y-5' onSubmit={formik.handleSubmit}>
      <div className="name">
        <input type="text" placeholder='name' className="form-control w-full capitalize"
         value={formik.values.name}
         onChange={formik.handleChange}
         onBlur={formik.handleBlur}
         name='name'
         />
        {formik.errors.name&&formik.touched.name&&<p className='flex items-center text-red-700'>*{formik.errors.name}</p>}
      </div>
      <div className="email">
        <input type="email" placeholder='email' className="form-control w-full capitalize"
         value={formik.values.email}
         onChange={formik.handleChange}
         onBlur={formik.handleBlur}
         name='email'

         />
         
        {formik.errors.email&&formik.touched.email&&<p className='flex items-center text-red-700'>*{formik.errors.email}</p>}
        {emailExistError && <p className='flex items-center text-red-700'>*{emailExistError}</p>}

      </div>
      <div className="password">
        <input type="password" placeholder='password' className="form-control w-full capitalize"
         value={formik.values.password}
         onChange={formik.handleChange}
         onBlur={formik.handleBlur}
         name='password'

         />
        {formik.errors.password&&formik.touched.password&&<p className='flex items-center text-red-700'>*{formik.errors.password}</p>}
      </div>
      <div className="rePassword">
        <input type="password" placeholder='rePassword' className="form-control w-full capitalize"
         value={formik.values.rePassword}
         onChange={formik.handleChange}
         onBlur={formik.handleBlur}
         name='rePassword'
         
         />
        {formik.errors.rePassword&&formik.touched.rePassword&&<p className='flex items-center text-red-700'>* repassword must match password</p>}
      </div>
      <div className="phone">
        <input type="tel" placeholder='phone' className="form-control w-full capitalize" 
        value={formik.values.phone}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        name='phone'

        />
        {formik.errors.phone&&formik.touched.phone&&<p className='flex items-center text-red-700'>*{formik.errors.phone}</p>}
      </div>
      <div className="button">
      <button type='submit' className='btn bg-primary-500 hover:bg-primary-700 text-white w-full '>Register</button>

      </div>

    </form>
    
    </>

  )
}
