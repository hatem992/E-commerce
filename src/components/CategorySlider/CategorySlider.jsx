import axios from "axios"
import { useEffect, useState } from "react"
import Loading from "../Loading/Loading.jsx"
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from "react-router-dom";

export default function CategorySlider() {
    let [categories,setCategories] = useState(null)



    async function getCategories() {
        try {
            const options ={
            url:"https://ecommerce.routemisr.com/api/v1/categories",
            method:"GET"
        }
        let {data} = await axios.request(options)
        setCategories(data.data) 
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(()=>{getCategories()},[])
    return (
    <>
    <h2 className="mb-4 text-lg capitalize">shop popular categories</h2>
    <section className="my-5">
        {categories ?
        
        <Swiper   
        autoplay={true}	
        breakpoints={{
            640:{
                slidesPerView:2
            },
            768:{
                slidesPerView:3
            },
            1024:{
                slidesPerView:5
            }
        }}
        // slidesPerView={"auto"}
        loop={true}
         className="mb-10" >
            {categories.map((category)=>
            <SwiperSlide key={category._id}>
                <div className="h-52 object-cover">
                <img src={category.image} alt="category image" className="h-full w-full object-cover" />
                </div>
               <Link to={`/categories/${category._id}`}> <h1 className="mt-5 text-center cursor-pointer">{category.name}</h1></Link>
            </SwiperSlide>
            )}
        </Swiper>
        
        : <Loading/>}
    </section>

    </>
)
}
