import axios from 'axios'
import { useFormik } from 'formik'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'


export default function ForgetPassword() {

      const navigate = useNavigate()

      async function forgetPassword(values) {
        let loading = toast.loading("sending code to your email")
        try {
          const options ={
            url:`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
            method:`POST`,
            data:values
          }

          let {data} = await axios.request(options)
          if (data.statusMsg === "success") {
            toast.success(data.message)
            setTimeout(()=>{
              navigate("/CodeVerification")
            },1000)
          }          
        } catch (error) {
          console.log(error);
          
        }finally{
          toast.dismiss(loading)
        }
      }


      // async function codeVerification(values) {
      //   try {
          
      //   } catch (error) {
      //     console.log(error);
          
      //   }
      // }



  
      const validationSchema= yup.object({
        email:yup.string().email("email is invalid").required("email is required"),
      })

        const formik = useFormik({
          initialValues:{
            "email":"",
        },
        validationSchema,
        onSubmit: forgetPassword
        })

  return (
  
  <>
<h2 className='mb-10'>Forget password :</h2>
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

      <div className="button">
      <button type='submit' className='btn bg-primary-500 hover:bg-primary-700 text-white w-full '>Send Code</button>
      </div>


    </form>    
    </>
  )
}
