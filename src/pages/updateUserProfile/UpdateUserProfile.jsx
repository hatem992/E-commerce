import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react'
import { useContext } from 'react';
import * as yup from "yup";
import { UserContext } from '../../context/User.context.jsx';
import toast from 'react-hot-toast';

export default function UpdateUserProfile() {

  const {token} = useContext(UserContext)

  async function updateUserInfo(values) {
    let loading = toast.loading("updating your data...")
      try {
        const updatedValues = Object.fromEntries(
          Object.entries(values).filter(([_, value]) => value !== '')
        );

    const options = {
      url:`https://ecommerce.routemisr.com/api/v1/users/updateMe/`,
      method:`PUT`,
      headers:{
        token
      },
      data:updatedValues
    }

    let {data} = await axios.request(options)
    console.log(data);
    
    data.message === "success" && toast.success("your data is updated")    
  } catch (error) {
    console.log(error)
  }finally{
    toast.dismiss(loading)
  }

  }

  const phoneRegex = /^(20)?01[0125][0-9]{8}$/

  const validationSchema = yup.object({
      email:yup.string().email("email is invalid"),
      phone:yup.string().matches(phoneRegex,"must be an egyption number"),
      name:yup.string().min(2,"name must be more than two characters").max(30,"name must be less than 30 chatacters"),    
  })

  const formik = useFormik({
    initialValues:{
      "email":"",
      "password":"",
      "name":""
    },
    validationSchema, 
    onSubmit:updateUserInfo   
  })


  return (
    <>
      <h2>update user profile</h2>

      <form action="" className='mt-10 space-y-3' onSubmit={formik.handleSubmit}>

        <div className="email">
          <input type="email" className='w-full form-control' placeholder='Email' 
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          name='email'
          />
          {formik.errors.email&&formik.touched.email&&<p className='text-red-600'>*{formik.errors.email}</p>}
        </div>
        <div className="name">
          <input type="text" className='w-full form-control' placeholder='Name' 
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          name='name'
          />
          {formik.errors.name&&formik.touched.name&&<p className='text-red-600'>*{formik.errors.name}</p>}

        </div>
        <div className="phone">
          <input type="tel" className='w-full form-control' placeholder='Phone' 
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phone}
          name='phone'
          />
          {formik.errors.phone&&formik.touched.phone&&<p className='text-red-600'>*{formik.errors.phone}</p>}

        </div>
        <button type='submit' className='btn bg-primary-500 text-white hover:bg-primary-600 transition-colors duration-150'>Update</button>
      </form>
    </>
  )
}
