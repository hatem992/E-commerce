import { useEffect, useState } from 'react'
import Card from '../../components/Card/Card.jsx';
import axios from 'axios';
import Loading from '../../components/Loading/Loading.jsx';
import HomeSlider from '../../components/HomeSlider/HomeSlider.jsx';
import CategorySlider from '../../components/CategorySlider/CategorySlider.jsx';

export default function Home() {

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
<HomeSlider/>
<CategorySlider/>

    {!products ? <Loading/> :
    <div className="cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-5">
      {products.map((product)=><Card key={product.id} productInfo={product}/>)}
    </div>}

    </>
  )
}
