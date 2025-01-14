import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import Loading from '../../components/Loading/Loading.jsx';
import { useParams } from 'react-router-dom';
import { CartContext } from '../../context/Cart.context.jsx';
import ReactImageGallery from 'react-image-gallery';
import 'swiper/css';
import { Swiper,SwiperSlide } from 'swiper/react';
import Card from '../../components/Card/Card.jsx';
import useOnline from '../../hooks/useOnline.jsx';


export default function ProductDetails() {
  
  let {addProductToCart} = useContext(CartContext)
  const [productDetails,setProductDetails] = useState(null)
  const [relatedProducts,setRelatedProducts] = useState(null)

  const[productDetailsLoading,setProductDetailsLoading] = useState(false)
  const[relatedProductLoading,setRelatedProductLoading] = useState(false)

  let {id} = useParams()

    async function getSpecificProduct() {
        setProductDetailsLoading(true)
        try {
            const options = {
                url:`https://ecommerce.routemisr.com/api/v1/products/${id}`,
                method:"GET"
            }
            let {data} = await axios.request(options)
            setProductDetails(data.data)
        } catch (error) {
            console.log(error);
        }finally{
            setProductDetailsLoading(false)
        }
    }

    async function getRelatedProducts() {
        setRelatedProductLoading(true)
        try {
        const options = {
            url:`https://ecommerce.routemisr.com/api/v1/products?category[in]=${productDetails.category._id}`,
            method:"GET"
        }
        let {data} = await axios.request(options)
        setRelatedProducts(data.data)     
               
    } catch (error) {
        console.log(error);
    }finally{
        setRelatedProductLoading(false)
    }
    }

    useEffect(()=>{
    
        getSpecificProduct();
    //     console.log(productDetails,"the product detail in normal fn")
    //   return()=>{
    //     console.log("product in clean up" , productDetails)
    //   }
    },[id])
  
    useEffect(()=>{
        if (productDetails === null)  return;
        getRelatedProducts();
       
    },[productDetails])

    let isOnline = useOnline()
  
return (
<>

    {!productDetailsLoading?
        <>
            {productDetails ?
            <>
            <section className= "grid grid-cols-12 gap-12">
            <div className="col-span-8 md:col-span-4">

                <ReactImageGallery
                
                showFullscreenButton={false}
                showPlayButton={false}
                showNav={false}
                
                items={productDetails.images.map(image=>{
                    return{
                        original:image,
                        thumbnail:image
                    }
                })}/>

            </div>

            <div className='col-span-8 space-y-3' >
                <div>
                    <h2 className='text-2xl font-bold'>{productDetails.title}</h2>
                    <h3 className='text-primary-600 font-semibold'>{productDetails.category.name}</h3>
                </div>
                <p className='text-slate-500'>{productDetails.description}</p>
                <div className='flex justify-between items-center mt-5'>
                    <span>{productDetails.price} L.E</span>

                    <div className="rating flex items-center">
                    <i className="fa-solid fa-star text-yellow-500 mr-1"></i>
                    <span>{productDetails.ratingsAverage}</span>
                    </div>
                </div>
                {isOnline && <div className="button col-span-8">
                    <button type='submit' onClick={()=>{
                        addProductToCart({productId:id})
                    }} className='btn text-white bg-primary-600  w-full transition-colors duration-150 hover:bg-primary-700' >Add To Cart</button>
                </div>}


            </div>
            </section>

            <section className='mt-20 space-y-2'>
                <h2 className='font-semibold text-2xl'>Related Products :</h2>
                {relatedProducts ? <Swiper breakpoints={{
                    0:{
                        slidesPerView:2
                    },
                    640:{
                        slidesPerView:3

                    },
                    768:{
                        slidesPerView:4
                    },
                    1024:{
                        slidesPerView:5
                    }
                }} spaceBetween={15}>
                    {relatedProducts.map((product)=>
                        <SwiperSlide key={product.id}>
                            <Card productInfo={product}/>
                        </SwiperSlide>
                    )}
                </Swiper> : <Loading/>}
            </section>        
            
            </>
            :<div className='p-7 rounded-md bg-slate-300 bg-opacity-50'><p className='text-xl'>there is no products</p></div>}
        </>   
 
    : <Loading/>}
</>
)








//     return (
//     <>
//         {productDetails ?

//         <>
//         <section className= "grid grid-cols-12 gap-12">
//         <div className="col-span-8 md:col-span-4">

//             <ReactImageGallery
            
//             showFullscreenButton={false}
//             showPlayButton={false}
//             showNav={false}
            
//             items={productDetails.images.map(image=>{
//                 return{
//                     original:image,
//                     thumbnail:image
//                 }
//             })}/>

//         </div>

//         <div className='col-span-8 space-y-3' >
//             <div>
//                 <h2 className='text-2xl font-bold'>{productDetails.title}</h2>
//                 <h3 className='text-primary-600 font-semibold'>{productDetails.category.name}</h3>
//             </div>
//             <p className='text-slate-500'>{productDetails.description}</p>
//             <div className='flex justify-between items-center mt-5'>
//                 <span>{productDetails.price} L.E</span>

//                 <div className="rating flex items-center">
//                 <i className="fa-solid fa-star text-yellow-500 mr-1"></i>
//                 <span>{productDetails.ratingsAverage}</span>
//                 </div>
//             </div>

//             <div className="button col-span-8">
//                 <button type='submit' onClick={()=>{
//                     addProductToCart({productId:id})
//                 }} className='btn text-white bg-primary-600  w-full transition-colors duration-150 hover:bg-primary-700' >Add To Cart</button>
//             </div>

//         </div>
//         </section>

//         <section className='mt-20 space-y-2'>
//             <h2 className='font-semibold text-2xl'>Related Products :</h2>
//             {relatedProducts ? <Swiper breakpoints={{
//                 0:{
//                     slidesPerView:2
//                 },
//                 640:{
//                     slidesPerView:3

//                 },
//                 768:{
//                     slidesPerView:4
//                 },
//                 1024:{
//                     slidesPerView:5
//                 }
//             }} spaceBetween={15}>
//                 {relatedProducts.map((product)=>
//                     <SwiperSlide key={product.id}>
//                         <Card productInfo={product}/>
//                     </SwiperSlide>
//                 )}
//             </Swiper> : <Loading/>}
//         </section>        
        
//         </> : <Loading/>    
//     }
//     </>
// )
}
