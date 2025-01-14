import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from '../../components/Loading/Loading.jsx'
import Card from '../../components/Card/Card.jsx'

export default function Products() {
  const [products,setProducts] = useState(null)
  async function getAllProducts() {
      const options = {
        url:"https://ecommerce.routemisr.com/api/v1/products",
        method:"GET"
      }
      let {data} = await axios.request(options)
      setProducts(data.data)
  }
  
  useEffect(()=>{
    getAllProducts()
  },[])
  
  return (
    <>
    <h2 className='font-semibold text-2xl mb-5'>all products :</h2>
    {!products ? <Loading/> :
    <div className="cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-5">
      {products.map((product)=><Card key={product.id} productInfo={product}/>)}
    </div>}

    </>
  )
}
