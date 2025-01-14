import React, { useEffect, useState } from 'react'
import Loading from '../../components/Loading/Loading.jsx'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { SwiperSlide, Swiper} from 'swiper/react'
import Card from '../../components/Card/Card.jsx'

export default function Category() {
    let {id} = useParams()
    
    
    const [catregoryDetailes,setCatregoryDetailes] = useState(null)
    const [relatedProducts,setRelatedProducts] = useState(null)
    

    async function getSpecificCategory() {
        try {
                const options = {
                    url:`https://ecommerce.routemisr.com/api/v1/categories/${id}`,
                    method:`GET`
                }
                let {data} = await axios.request(options)
                setCatregoryDetailes(data.data)
            } catch (error) {
                console.log(error);
                
            }
        }
        
        async function getRelatedProducts() {
            try {
                const options = {
                    url:`https://ecommerce.routemisr.com/api/v1/products?category[in]=${id}`,
                    method:"GET"
                }
                let {data} = await axios.request(options)
                console.log(data);
                setRelatedProducts(data.data)     
                console.log(id);
                
                       
            } catch (error) {
                console.log(error);
            }
            }
        

        useEffect(()=>{
            getSpecificCategory()
        },[])

        useEffect(()=>{
            if (catregoryDetailes === null)  return;
            getRelatedProducts();
            
        },[catregoryDetailes]) 

  return (
    <>

        {
            catregoryDetailes ?
            <>
                <section className= "grid grid-cols-12 gap-12">
                <div className="card col-span-6 lg:col-span-3">
                    <img className='w-full' src={catregoryDetailes.image} alt={catregoryDetailes.name} />
                    <h2 className='text-2xl text-center font-semibold mt-2'>{catregoryDetailes.name}</h2>
                </div>

                </section>

                <section className='mt-20 space-y-2'>
                    <h2 className='font-semibold text-2xl mb-5'>Related Products</h2>
                    {relatedProducts ? 
                        relatedProducts.length > 0 ?
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-5'>
                        {relatedProducts.map((product)=>
                            <Card key={product.id} productInfo={product}/>
                        )}
                        </div> : <div className='bg-slate-300 p-10 rounded-md bg-opacity-50'><p className='text-xl'>there is no products </p></div>
                    : <Loading/>}
                </section>  
            
            </>
            
            :<Loading/>
            
        }
    </>
  )
}
