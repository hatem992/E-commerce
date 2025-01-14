import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from '../../components/Loading/Loading.jsx'
import Category from '../Category/Category.jsx'
import { Link } from 'react-router-dom'

export default function AllCategories() {

    let [allCategories,setAllCategories] = useState(null)

    async function getAllCaregories() {
        const options = {
            url :`https://ecommerce.routemisr.com/api/v1/categories`,
            method :"GET"
        }
        let {data} = await axios.request(options)
        console.log(data.data);
        setAllCategories(data.data)
        
    }

    useEffect(()=>{
        getAllCaregories()
    },[])

  return (

    <>
        <section >
            <h2 className='mb-10 text-2xl font-semibold'>all categories :</h2>
    {
        allCategories ? 

        <div className="grid grid-cols-12 sm:gap-5">
        {allCategories.map((category)=>
            <Link to={`/categories/${category._id}`} key={category._id} className="card col-span-12 md:col-span-4 lg:col-span-3 shadow-md rounded-md overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-150">
                <img className='w-full h-56 object-cover' src={category.image} alt={category.name} />
              <div className="p-5 flex justify-center items-center">
                <h3>{category.name}</h3>
              </div>
            </Link>

           )} </div>

        : <Loading/>

    }
        </section>
    </>

)
}
