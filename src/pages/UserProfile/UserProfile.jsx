import React, { useContext, useEffect } from 'react'
import { jwtDecode } from "jwt-decode";

import { UserContext } from '../../context/User.context.jsx'
import { Link } from 'react-router-dom';



export default function UserProfile() {
    const {token} = useContext(UserContext)
    const decoded = jwtDecode(token);
    let {name} = decoded

    

  return (
    <>
    <div className='text-center'>
        <h2 className='text-2xl mt-5 font-bold capitalize'>welcome <span className='font-extrabold'>{name}</span></h2>
        <div className='mt-20 space-y-3 bg-gray-200 bg-opacity-70 flex flex-col justify-center items-center rounded-md shadow-md py-10 '>
                <Link className='shadow-lg p-5 rounded-md w-3/4 md:w-1/4 bg-gray-300 bg-opacity-95 cursor-pointer hover:bg-gray-400 transition-colors duration-150' to="/updateUserProfile">update user profile</Link>
                <Link className='shadow-lg p-5 rounded-md w-3/4 md:w-1/4  bg-gray-300 bg-opacity-95 cursor-pointer hover:bg-gray-400 transition-colors duration-150' to="/updateUserPassword">update user password</Link>
        </div>
    </div>
    </>
  )
}
