import React, { useContext, useState } from 'react'
import logo from "../../assets/images/freshcart-logo.svg";
import { Link, NavLink } from 'react-router-dom';
import { UserContext } from '../../context/User.context.jsx';
import { CartContext } from '../../context/Cart.context.jsx';
import { useEffect } from 'react';
import classNames from 'classnames';

export default function Navbar() {

    const{token,LogOut} = useContext(UserContext)
    const {cartInfo,getCartProducts} = useContext(CartContext)
    const [isOpen,setIsOpen] = useState(false)

    const menueToggle =()=>{
        setIsOpen(!isOpen)
    }

    useEffect(()=>
        {getCartProducts()
    },[])


  return (
<>
    <nav className='bg-slate-200 p-3 fixed top-0 left-0 right-0 z-50 shadow-sm'>
        <div className="container flex justify-between items-center flex-wrap md:flex-nowrap  ">
            <Link to="/">
                <img src={logo} alt="the logo of site" />
            </Link>

            {token ? 
                
            <> 

                <ul className="hidden md:flex items-center mx-5 gap-3">
                    <li className='text-slate-600'>
                        <NavLink className={({isActive})=>{
                            return `relative after:w-0 after:h-0.5 after:bg-primary-600 after:transition-[width] after:duration-200 after:absolute after:left-0 after:-bottom-1 hover:after:w-full ${isActive ? `after:!w-full font-semibold` : ``}`
                        }} to="/">Home</NavLink>
                    </li>
                    <li className='text-slate-600'>
                        <NavLink className={({isActive})=>{
                            return `relative after:w-0 after:h-0.5 after:bg-primary-600 after:transition-[width] after:duration-200 after:absolute after:left-0 after:-bottom-1 hover:after:w-full ${isActive ? `after:!w-full font-semibold` : ``}`
                        }} to="/cart">Cart</NavLink>
                    </li>
                    <li className='text-slate-600'>
                        <NavLink className={({isActive})=>{
                            return `relative after:w-0 after:h-0.5 after:bg-primary-600 after:transition-[width] after:duration-200 after:absolute after:left-0 after:-bottom-1 hover:after:w-full ${isActive ? `after:!w-full font-semibold` : ``}`
                        }} to="/products">Products</NavLink>
                    </li>
                    <li className='text-slate-600'>
                        <NavLink className={({isActive})=>{
                            return `relative after:w-0 after:h-0.5 after:bg-primary-600 after:transition-[width] after:duration-200 after:absolute after:left-0 after:-bottom-1 hover:after:w-full ${isActive ? `after:!w-full font-semibold` : ``}`
                        }} to="/categories">Categories</NavLink>
                    </li>
                    <li className='text-slate-600'>
                        <NavLink className={({isActive})=>{
                            return `relative after:w-0 after:h-0.5 after:bg-primary-600 after:transition-[width] after:duration-200 after:absolute after:left-0 after:-bottom-1 hover:after:w-full ${isActive ? `after:!w-full font-semibold` : ``}`
                        }} to="/brands">Brands</NavLink>
                    </li>
                    <li className='text-slate-600'>
                        <NavLink className={({isActive})=>{
                            return `relative after:w-0 after:h-0.5 after:bg-primary-600 after:transition-[width] after:duration-200 after:absolute after:left-0 after:-bottom-1 hover:after:w-full ${isActive ? `after:!w-full font-semibold` : ``}`
                        }} to="/allorders">Orders</NavLink>
                    </li>
                    <li className='text-slate-600'>
                        <NavLink className={({isActive})=>{
                            return `relative after:w-0 after:h-0.5 after:bg-primary-600 after:transition-[width] after:duration-200 after:absolute after:left-0 after:-bottom-1 hover:after:w-full ${isActive ? `after:!w-full font-semibold` : ``}`
                        }} to="/whishlist">Whishlist</NavLink>
                    </li>
                </ul>

                <Link to="/cart" 
                className="cart ml-auto cursor-pointer relative">
                <i className="fa-solid fa-cart-shopping text-lg"></i>
                <div className="cart-counter w-5 h-5 rounded-full bg-primary-400 absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 flex justify-center items-center ">
                    {cartInfo === null ?<i className='fa-solid fa-spinner fa-spin text-white text-sm'></i>: <span className='text-white text-sm flex justify-center items-center'>{cartInfo.numOfCartItems}</span> }
                </div>
                </Link>

                <Link to="/userProfile" className='w-11 h-11 rounded-full overflow-hidden ml-7'>
                        <img src="data:image/png;base64,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" alt="" />
                    </Link>

                    <ul className='ml-7 hidden md:flex gap-4'>
                        <li>
                            <NavLink to="logout" onClick={()=>{
                                LogOut()
                            }}>
                            <i className="fa-solid fa-arrow-right-from-bracket text-2xl"></i>
                            </NavLink>
                        </li>
                    </ul>
                    
                    <button onClick={menueToggle} className='md:hidden ml-7 text-2xl'>
                        {isOpen ? <div><i className="fa-solid fa-xmark"></i></div> : <div><i className="fa-solid fa-bars"></i></div>}
                    </button>

                    {/* {isOpen &&   */}


                    <ul
                    className={classNames("md:hidden py-3 space-y-5  w-full items-center flex-wrap ml-5 gap-3 overflow-hidden transition-all duration-300 ease-in-out",{
                        "max-h-0 opacity-0": !isOpen,
                        "max-h-screen opacity-100": isOpen,
                    })}
                    // className="md:hidden py-3 space-y-5  w-full items-center flex-wrap ml-5 gap-3"
                    
                    >
                    <li className='text-slate-600'>
                        <NavLink className={({isActive})=>{
                            return `relative after:w-0 after:h-0.5 after:bg-primary-600 after:transition-[width] after:duration-200 after:absolute after:left-0 after:-bottom-1 hover:after:w-full ${isActive ? `after:!w-full font-semibold` : ``}`
                        }} to="/">Home</NavLink>
                    </li>
                    <li className='text-slate-600'>
                        <NavLink className={({isActive})=>{
                            return `relative after:w-0 after:h-0.5 after:bg-primary-600 after:transition-[width] after:duration-200 after:absolute after:left-0 after:-bottom-1 hover:after:w-full ${isActive ? `after:!w-full font-semibold` : ``}`
                        }} to="/cart">Cart</NavLink>
                    </li>
                    <li className='text-slate-600'>
                        <NavLink className={({isActive})=>{
                            return `relative after:w-0 after:h-0.5 after:bg-primary-600 after:transition-[width] after:duration-200 after:absolute after:left-0 after:-bottom-1 hover:after:w-full ${isActive ? `after:!w-full font-semibold` : ``}`
                        }} to="/products">Products</NavLink>
                    </li>
                    <li className='text-slate-600'>
                        <NavLink className={({isActive})=>{
                            return `relative after:w-0 after:h-0.5 after:bg-primary-600 after:transition-[width] after:duration-200 after:absolute after:left-0 after:-bottom-1 hover:after:w-full ${isActive ? `after:!w-full font-semibold` : ``}`
                        }} to="/categories">Categories</NavLink>
                    </li>
                    <li className='text-slate-600'>
                        <NavLink className={({isActive})=>{
                            return `relative after:w-0 after:h-0.5 after:bg-primary-600 after:transition-[width] after:duration-200 after:absolute after:left-0 after:-bottom-1 hover:after:w-full ${isActive ? `after:!w-full font-semibold` : ``}`
                        }} to="/brands">Brands</NavLink>
                    </li>
                    <li className='text-slate-600'>
                        <NavLink className={({isActive})=>{
                            return `relative after:w-0 after:h-0.5 after:bg-primary-600 after:transition-[width] after:duration-200 after:absolute after:left-0 after:-bottom-1 hover:after:w-full ${isActive ? `after:!w-full font-semibold` : ``}`
                        }} to="/allorders">Orders</NavLink>
                    </li>
                    <li className='text-slate-600'>
                        <NavLink className={({isActive})=>{
                            return `relative after:w-0 after:h-0.5 after:bg-primary-600 after:transition-[width] after:duration-200 after:absolute after:left-0 after:-bottom-1 hover:after:w-full ${isActive ? `after:!w-full font-semibold` : ``}`
                        }} to="/whishlist">Whishlist</NavLink>
                    </li>
                    <li>
                        <NavLink  to="logout" className={({isActive})=>{
                            return `relative after:w-0 after:h-0.5 after:bg-primary-600 after:transition-[width] after:duration-200 after:absolute after:left-0 after:-bottom-1 hover:after:w-full ${isActive ? `after:!w-full font-semibold` : ``}`
                        }}  onClick={()=>{
                                LogOut()
                        }}>
                        Logout
                        </NavLink>
                    </li>
                    </ul>



                {/* } */}
            </>
                
                :
                
                <ul className='ml-10 flex  gap-4'>

                    <li>
                        <NavLink className={({isActive})=>{
                            return `relative after:w-0 after:h-0.5 after:bg-primary-600 after:transition-[width] after:duration-200 after:absolute after:left-0 after:-bottom-1 hover:after:w-full ${isActive ? `after:!w-full font-semibold` : ``}`
                        }} to="/signup">
                            SignUP
                        </NavLink>
                    </li>
                
                    <li>
                        <NavLink className={({isActive})=>{
                            return `relative after:w-0 after:h-0.5 after:bg-primary-600 after:transition-[width] after:duration-200 after:absolute after:left-0 after:-bottom-1 hover:after:w-full ${isActive ? `after:!w-full font-semibold` : ``}`
                        }} to="/login">
                            Login
                        </NavLink>
                    </li>
            </ul>
}

        </div>
    </nav>
</>

)



//   return (
// <>
//     <nav className='bg-slate-200 py-3  fixed top-0 left-0 right-0 z-50 shadow-sm'>
//         <div className="container flex items-center  ">
//             <a href="">
//                 <img src={logo} alt="the logo of site" />
//             </a>

//             <ul className="flex items-center ml-5 gap-3">
//                 <li className='text-slate-600'>
//                     <NavLink className={({isActive})=>{
//                         return `relative after:w-0 after:h-0.5 after:bg-primary-600 after:transition-[width] after:duration-200 after:absolute after:left-0 after:-bottom-1 hover:after:w-full ${isActive ? `after:!w-full font-semibold` : ``}`
//                     }} to="/">Home</NavLink>
//                 </li>
//                 <li className='text-slate-600'>
//                     <NavLink className={({isActive})=>{
//                         return `relative after:w-0 after:h-0.5 after:bg-primary-600 after:transition-[width] after:duration-200 after:absolute after:left-0 after:-bottom-1 hover:after:w-full ${isActive ? `after:!w-full font-semibold` : ``}`
//                     }} to="/cart">Cart</NavLink>
//                 </li>
//                 <li className='text-slate-600'>
//                     <NavLink className={({isActive})=>{
//                         return `relative after:w-0 after:h-0.5 after:bg-primary-600 after:transition-[width] after:duration-200 after:absolute after:left-0 after:-bottom-1 hover:after:w-full ${isActive ? `after:!w-full font-semibold` : ``}`
//                     }} to="/products">Products</NavLink>
//                 </li>
//                 <li className='text-slate-600'>
//                     <NavLink className={({isActive})=>{
//                         return `relative after:w-0 after:h-0.5 after:bg-primary-600 after:transition-[width] after:duration-200 after:absolute after:left-0 after:-bottom-1 hover:after:w-full ${isActive ? `after:!w-full font-semibold` : ``}`
//                     }} to="/categories">Categories</NavLink>
//                 </li>
//                 <li className='text-slate-600'>
//                     <NavLink className={({isActive})=>{
//                         return `relative after:w-0 after:h-0.5 after:bg-primary-600 after:transition-[width] after:duration-200 after:absolute after:left-0 after:-bottom-1 hover:after:w-full ${isActive ? `after:!w-full font-semibold` : ``}`
//                     }} to="/brands">Brands</NavLink>
//                 </li>
//                 <li className='text-slate-600'>
//                     <NavLink className={({isActive})=>{
//                         return `relative after:w-0 after:h-0.5 after:bg-primary-600 after:transition-[width] after:duration-200 after:absolute after:left-0 after:-bottom-1 hover:after:w-full ${isActive ? `after:!w-full font-semibold` : ``}`
//                     }} to="/allorders">Orders</NavLink>
//                 </li>
//                 <li className='text-slate-600'>
//                     <NavLink className={({isActive})=>{
//                         return `relative after:w-0 after:h-0.5 after:bg-primary-600 after:transition-[width] after:duration-200 after:absolute after:left-0 after:-bottom-1 hover:after:w-full ${isActive ? `after:!w-full font-semibold` : ``}`
//                     }} to="/whishlist">Whishlist</NavLink>
//                 </li>
//             </ul>

//             <Link to="/cart" 
//             className="cart ml-auto cursor-pointer relative">
//             <i className="fa-solid fa-cart-shopping text-lg"></i>
//             <div className="cart-counter w-5 h-5 rounded-full bg-primary-400 absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 flex justify-center items-center ">
//                    {cartInfo === null ?<i className='fa-solid fa-spinner fa-spin text-white text-sm'></i>: <span className='text-white text-sm flex justify-center items-center'>{cartInfo.numOfCartItems}</span> }

//             </div>
//             </Link>

//             {/* <ul className="flex items-center  gap-4 ml-10">
//                 <li>
//                     <NavLink to="https://www.facebook.com" target="_blank">
//                         <i className="fa-brands fa-facebook"></i>
//                     </NavLink>
//                 </li>
//                 <li>
//                     <NavLink to="https://www.instagram.com" target="_blank">
//                        <i className="fa-brands fa-instagram"></i>
//                     </NavLink>
//                 </li>
//                 <li>
//                     <NavLink to="https://www.tiktok.com" target="_blank">
//                     <i className="fa-brands fa-tiktok"></i>
//                     </NavLink>
//                 </li>
//                 <li>
//                     <NavLink to="https://www.x.com" target="_blank">
//                     <i className="fa-brands fa-x-twitter"></i>
//                     </NavLink>
//                 </li>
//                 <li>
//                     <NavLink to="https://www.linkedin.com" target="_blank">
//                         <i className="fa-brands fa-linkedin"></i>
//                     </NavLink>
//                 </li>
//                 <li>
//                     <NavLink to="https://www..com" target="_blank">
//                     <i className="fa-brands fa-youtube"></i>
//                     </NavLink>
//                 </li>
//             </ul> */}

//                 <Link to="/userProfile" className='w-11 h-11 rounded-full overflow-hidden ml-10'>
//                     <img src="data:image/png;base64,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" alt="" />
//                 </Link>

//                 {token ? 
                
//                 <ul className='ml-10 flex gap-4'>
//                     <li>
//                         <NavLink to="logout" onClick={()=>{
//                             LogOut()
//                         }}>
//                         <i className="fa-solid fa-arrow-right-from-bracket text-lg"></i>
//                         </NavLink>
//                     </li>
//                 </ul>
                
//                 :
                
//                 <ul className='ml-10 flex gap-4'>

//                     <li>
//                         <NavLink className={({isActive})=>{
//                             return `relative after:w-0 after:h-0.5 after:bg-primary-600 after:transition-[width] after:duration-200 after:absolute after:left-0 after:-bottom-1 hover:after:w-full ${isActive ? `after:!w-full font-semibold` : ``}`
//                         }} to="/signup">
//                             SignUP
//                         </NavLink>
//                     </li>
                
//                     <li>
//                         <NavLink className={({isActive})=>{
//                             return `relative after:w-0 after:h-0.5 after:bg-primary-600 after:transition-[width] after:duration-200 after:absolute after:left-0 after:-bottom-1 hover:after:w-full ${isActive ? `after:!w-full font-semibold` : ``}`
//                         }} to="/login">
//                             Login
//                         </NavLink>
//                     </li>
//             </ul>
// }

//         </div>
//     </nav>
// </>

// )
}
