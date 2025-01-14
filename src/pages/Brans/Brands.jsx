import React, { useEffect, useState } from 'react'
import Loading from '../../components/Loading/Loading.jsx'
import axios from 'axios'
import BrandOverlay from '../../components/BrandOverlay/BrandOverlay.jsx'

export default function Brands() {

    const [allBrands,setAllBrands] = useState(null)
    const [selectedBrand,setSelectedBrand] = useState(null)
    const [overlayIsVisible,setOverlayIsVisible] = useState(false)


    async function getAllBrands() {
        const options = {
            url :`https://ecommerce.routemisr.com/api/v1/brands`,
            method:"GET"
        }
        let {data} = await axios.request(options)
        setAllBrands(data.data)
        console.log(data);
        
    }

    useEffect(()=>{
        getAllBrands()
    },[])

    const handleClick =(brand)=>{
      setSelectedBrand(brand)
      setOverlayIsVisible(true)
    }

    const closeOverlay = ()=>{
      setSelectedBrand(null)
      setOverlayIsVisible(false)
    }

  return (
    <>
        <section className='relative' >
        <h2 className='mb-10 text-2xl font-semibold'>all brands :</h2>
    {
        allBrands ? <>
        <div className="grid grid-cols-12 sm:gap-5">
        {allBrands.map((brand)=>
            <div key={brand._id} onClick={()=>{handleClick(brand)}}
            className="card col-span-12 md:col-span-4 lg:col-span-3 shadow-md rounded-md overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-150">
                <img className='w-full h-56 object-contain' src={brand.image} alt={brand.name} />
              <div className="p-5 flex justify-center items-center">
                <h3>{brand.name}</h3>
              </div>
            </div>
           )} 
           
           </div>
           {overlayIsVisible && <BrandOverlay brand={selectedBrand} onClose={closeOverlay}/> }
           
           </>
           
        : <Loading/>
    }
        </section>
    </>
  )
}
