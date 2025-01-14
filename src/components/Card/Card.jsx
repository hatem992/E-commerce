
import React, { useContext } from "react";
import { CartContext } from "../../context/Cart.context.jsx";
import { Link } from "react-router-dom";
import { WhishlistContext } from "../../context/Whishlist.context.jsx"; 
// import { WhishlistConext } from '../context/Whishlist.context.jsx'




export default function Card({ productInfo }) {
  const { title, imageCover, price, description, ratingsAverage, category, id } = productInfo;
  const { addProductToCart } = useContext(CartContext);
  const { addToWhishlist } = useContext(WhishlistContext); 
  
  return (
    <>
      <div className="card rounded-lg overflow-hidden shadow-lg group/card">
        <div className="image relative">
          <img className="w-full" src={imageCover} alt={title} />
          <div className="layer absolute top-0 left-0 bg-slate-100 bg-opacity-50 opacity-0 w-full h-full flex gap-3 justify-center items-center group-hover/card:opacity-100 transition-opacity duration-300">
            <div
              onClick={() => addToWhishlist({ productId: id })}

              className="icon w-8 h-8 rounded-full bg-primary-500 text-white cursor-pointer flex justify-center items-center transition-transform duration-300 hover:rotate-12 hover:scale-125"
            >
              <i className="fa-solid fa-heart"></i>
            </div>
            <div
              onClick={() => addProductToCart({ productId: id })}
              className="icon w-8 h-8 rounded-full bg-primary-500 text-white cursor-pointer flex justify-center items-center transition-transform duration-300 hover:rotate-12 hover:scale-125"
            >
              <i className="fa-solid fa-cart-shopping"></i>
            </div>
            <Link
              to={`/product/${id}`}
              className="icon w-8 h-8 rounded-full bg-primary-500 text-white cursor-pointer flex justify-center items-center transition-transform duration-300 hover:rotate-12 hover:scale-125"
            >
              <i className="fa-solid fa-eye"></i>
            </Link>
          </div>
        </div>
        <div className="card-content mt-2 p-4 space-y-3">
          <h4 className="text-md text-primary-400">{category?.name || "Uncategorized"}</h4>
          <h3 className="text-2xl line-clamp-1">
            <Link to={`/product/${id}`}>{title}</Link>
          </h3>
          <p className="text-slate-500 line-clamp-2 text-sm">{description}</p>
          <div className="price-rating flex justify-between items-center">
            <span>{price} EGP</span>
            <div className="rating flex items-center">
              <span className="text-slate-600">{ratingsAverage}</span>
              <i className="fa-solid fa-star text-yellow-500 ml-1"></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}






// import React, { useContext } from 'react'
// import { CartContext } from '../context/Cart.context.jsx'
// import { Link } from 'react-router-dom'
// import { WhishlistConext } from '../context/Whishlist.context.jsx'

// export default function Card({productInfo}) {
//   let{title,imageCover,price,description,ratingsAverage,category,id} = productInfo
//   let {addProductToCart} = useContext(CartContext)
//   let {addToWhishlist} = useContext(WhishlistConext)
//   return (
//     <>
//       <div className="card rounded-lg overflow-hidden shadow-md group/card">
//         <div className="iamge relative">
//         <img className='w-full' src={imageCover} alt="product image" />
//         <div className=" layer absolute top-0 left-0 bg-slate-100 bg-opacity-50 opacity-0 w-full h-full flex gap-3 justify-center items-center group-hover/card:opacity-100 transition-opacity duration-300">
//           <div onClick={()=>{
//               addToWhishlist({productId:id})            
//           }} className="icon w-8 h-8 rounded-full bg-primary-500 text-white cursor-pointer flex justify-center items-center transition-transform duration-300 hover:rotate-12 hover:scale-125">
//           <i class="fa-solid fa-heart"></i>
//           </div>
//           <div onClick={()=>{
//               addProductToCart({productId:id})            
//           }}
//           className="icon w-8 h-8 rounded-full bg-primary-500 text-white cursor-pointer flex justify-center items-center transition-transform duration-300 hover:rotate-12 hover:scale-125">
//           <i class="fa-solid fa-cart-shopping"></i>
//           </div>
//           <Link to={`/product/${id}`} className="icon w-8 h-8 rounded-full bg-primary-500 text-white cursor-pointer flex justify-center items-center transition-transform duration-300 hover:rotate-12 hover:scale-125">
//           <i class="fa-solid fa-eye"></i>
//           </Link>
//         </div>
//         </div>
//         <div className="card-content mt-2 p-4 space-y-3">
//           <h4 className='text-md text-primary-400'>{category.name}</h4>
//           <h3 className='text-2xl line-clamp-1'>
//           <Link to={`/product/${id}`}>
//             {title}
//           </Link>
//           </h3>
//           <p className='text-slate-500 line-clamp-2 text-sm'>{description}</p>
//           <div className="price-rating flex justify-between items-center">
//             <span>{price} EGP</span>
//             <div className="rating">
//               <span className='text-slate-600'>{ratingsAverage}</span>
//               <i class="fa-solid fa-star text-yellow-500 ml-1"></i>
//             </div>
//             </div>

//         </div>
//       </div>
    
//     </>
//   )
// }
