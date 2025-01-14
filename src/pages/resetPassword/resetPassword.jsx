import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router-dom';
import * as yup from 'yup'

export default function ResetPassword() {

    const navigate = useNavigate()

      const passswordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
    
      const validationSchema= yup.object({
        email:yup.string().email("email is invalid").required("email is required"),
        newPassword:yup.string().matches(passswordRegex,"Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character").required("password is required"),
      })

    let [resetError,setResetError] = useState(null)

    async function resetPassword(values) {
        let loading  = toast.loading("updating your password")
        try {
            const options = {
                url:`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
                method:`PUT`,
                data:values
            }
            let {data} = await axios.request(options)            
            if (data.token) {
                toast.success("your password is updated ...")
                setTimeout(()=>{
                    navigate("/login")
                },1000)
            }
        } catch (error) {
            setResetError(error.response.data.message)
            toast.error(error.response.data.message)
            console.log(error);
        }finally{
            toast.dismiss(loading)
        }
    }

    const formik = useFormik({
        initialValues:{
            "email":"",
            "newPassword":""
        },
        validationSchema,
        onSubmit:resetPassword
    })


  return (



    <>
        <h2>reset your password</h2>

        <form action="" className='space-y-3 mt-5' onSubmit={formik.handleSubmit}>
            <div>
                <input type="email" placeholder='Email'className='form-control w-full '
                value={formik.values.email} 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name='email' />
        {/* {resetError && <p className='flex items-center text-red-700'>*{resetError}</p> }  */}

        {formik.errors.email&&formik.touched.email&&<p className='flex items-center text-red-700'>*{formik.errors.email}</p>}

            </div>
            <div>
                <input type="text" placeholder='New Password'className='form-control w-full ' 
                value={formik.values.newPassword} 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name='newPassword' />

        {formik.errors.newPassword&&formik.touched.newPassword&&<p className='flex items-center text-red-700'>*{formik.errors.newPassword}</p>}

            </div>

            <button type='submit' className='btn bg-primary-500 text-white hover:bg-primary-600 transition-colors duration-150'>reset password</button>
        </form>

    </>
  )
}
