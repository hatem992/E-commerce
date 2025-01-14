import { createContext, useContext, useState } from "react";
import { UserContext } from "./User.context.jsx";
import axios from "axios";
import toast from "react-hot-toast";

export const WhishlistContext = createContext("")

export default function WhishlistProvider({children}) {
    
    const{token} =useContext(UserContext)

    const [wishlistInfo,setWishlistInfo] =useState(null)
    async function addToWhishlist({productId}) {
        let loading = toast.loading("Adding product to whishlist ...")
        try {
            const options ={
                url:"https://ecommerce.routemisr.com/api/v1/wishlist",
                method:"POST",
                headers:{
                    token
                },
                data:{
                    productId
                }
                
            }
            let {data} = await axios.request(options)
            if (data.status === "success") {
                toast.success(data.message)
                getWhishlist();
            }
        } catch (error) {
            console.log(error);
        }finally{
            toast.dismiss(loading)
        }        
    }

    async function getWhishlist() {
        try {
            const options ={
            url:`https://ecommerce.routemisr.com/api/v1/wishlist`,
            method:"GET",
            headers:{
                token
            }
        }
        let {data} = await axios.request(options)
        setWishlistInfo(data)
        } catch (error) {
            console.log(error);
            
        }
    }

    async function deleteFromWhishlist({productId}) {
        let loading =toast.loading("deleting from wishlist...")
        try {
            const options = {
            url:`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
            method:"DELETE",
            headers:{
                token
            }
        }
        let{data} = await axios.request(options)
        if (data.status ==="success") {
            getWhishlist()
            
            toast.success(data.message)
            // setWishlistInfo(prevData=>{
            //     console.log(prevData,"prevdata")
            //     return {...prevData,data:prevData.data?.filter((item)=>item.id !== productId )}
            // })   
        }
        } catch (error) {
            console.log(error);
            
        }finally{
            toast.dismiss(loading)
        }
    }
    return (
        <WhishlistContext.Provider value={{addToWhishlist , getWhishlist,wishlistInfo,deleteFromWhishlist}}>
            {children}
        </WhishlistContext.Provider>
    )
}
