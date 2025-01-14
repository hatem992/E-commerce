import React, { useContext } from 'react'
import { UserContext } from '../../context/User.context.jsx'
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from "yup";
import toast from 'react-hot-toast';

export default function UpdateUserPassword() {

  const {token} = useContext(UserContext)

  async function updateUserPassword(values) {
    let loading = toast.loading("updating your password...")
    try {
    const options = {
      url:`https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`,
      method:`PUT`,
      headers:{
        token
      },
      data:values
  }
    let {data} = await axios.request(options)
    if (data.message==="success") {
      toast.success("your password updated")
    }
    } catch (error) {
      toast.error(error.response.data.errors.msg)
    }finally{
      toast.dismiss(loading)
    }
  }

   const passswordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
 
   const validationSchema= yup.object({
    currentPassword:yup.string().matches(passswordRegex,"Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character").required("password is required"),
    password:yup.string().matches(passswordRegex,"Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character").required("new password is required"),
    rePassword:yup.string().oneOf([yup.ref("password")],"Re-password must match the new password").required("confirm password is required"),
   })

const formik = useFormik({
  initialValues:{
    "currentPassword":"",
    "password":"",
    "rePassword":""
  },
  validationSchema,
  onSubmit:updateUserPassword
})


  return (
    <>
      <h2 className='mt-5 font-semibold'>update your password</h2>
      <form action="" className='mt-5 space-y-3 ' onSubmit={formik.handleSubmit}>
        <div className="currentPassword">
          <input  type="text" className='form-control w-full' placeholder='your current password'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name='currentPassword'
          value={formik.values.currentPassword}/>
          {formik.touched.currentPassword && formik.errors.currentPassword && <p className='text-red-600'>* {formik.errors.currentPassword}</p>}
        </div>
        <div className="password">
          <input  type="password" className='form-control w-full' placeholder='your new password'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name='password'
          value={formik.values.password}  />
          {formik.touched.password && formik.errors.password && <p className='text-red-600'>* {formik.errors.password}</p>}

        </div>
        <div className="rePassword">
          <input  type="text" className='form-control w-full' placeholder='your rePassword'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name='rePassword'
          value={formik.values.rePassword}  />
          {formik.touched.rePassword && formik.errors.rePassword && <p className='text-red-600'>* {formik.errors.rePassword}</p>}
        </div>
        <button type='submit' className='btn text-white bg-primary-500 hover:bg-primary-600 transition-colors duration-150' >update password</button>
      </form>
    </>
  )
}

