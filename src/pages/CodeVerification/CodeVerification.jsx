import axios from 'axios';
import { useFormik } from 'formik'
import React from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function CodeVerification() {
    const navigate = useNavigate()

    async function verifyCode(values) {
        
        let loading = toast.loading("checking code ...")        
        try {
            const options = {
            url:`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
            method:"POST",
            data:values
        }
        let{data}= await axios.request(options)
        console.log(data);
        
        if (data.status === "Success") {
            toast.success("code is verified")
            setTimeout(()=>{
                navigate("/resetPassword")}
            ,1000)
        }
    } catch (error) {
            toast.error(error.response.data.message)            
        }finally{
            toast.dismiss(loading)
        }
    }


    const formik = useFormik({
        initialValues:{
            "resetCode":"",
        },
        onSubmit: verifyCode
    })

  return (
    <div className='mt-3'>
       <h2>Enter your code :</h2>     
       <h3>we have sent this code to your email</h3>     
    <form action="" onSubmit={formik.handleSubmit}>
        <input
        name='resetCode' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.resetCode} type="text" placeholder='Code' className='form-control mt-14 w-52' />
        
        <div className='mt-6'>
            <button type="submit" className='btn bg-primary-500 text-white hover:bg-primary-600 transition-colors duration-150'>Verify</button>
        </div>
    </form>
    </div>
  )
}
