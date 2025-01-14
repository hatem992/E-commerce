import axios from "axios";
import { createContext, useContext, useState } from "react";
import { UserContext } from "./User.context.jsx";
import toast from "react-hot-toast";

export const CartContext = createContext(null)


export default function CartProvider({children}){

    const {token} = useContext(UserContext)
    const [cartInfo,setCartInfo] = useState(null)

    async function addProductToCart({productId}) {
        let loading = toast.loading("Adding product to cart ...")
        try {
            const options ={
                url:"https://ecommerce.routemisr.com/api/v1/cart",
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
                getCartProducts()
            }
            
        } catch (error) {
            console.log(error);
        }finally{
            toast.dismiss(loading)
        }        
    }

    async function getCartProducts() {
        try {
            const options = {
                url:"https://ecommerce.routemisr.com/api/v1/cart",
                method:"GET",
                headers:{
                    token
                }
            }
            let {data} = await axios.request(options)
            setCartInfo(data)            
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteSpecificItem({productId}) {
        let deleting = toast.loading("Deleting product ...")
        try {
            const options = {
                url:`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                method:"DELETE",
                headers:{
                    token
                }
            }
            let {data} = await axios.request(options)
            if (data.status ==="success") {
                toast.success("Product deleted successfully")
                setCartInfo(data)                
            }
        } catch (error) {
            console.log(error);
        }finally{
            toast.dismiss(deleting)
        }
    }

    async function clearCart (){
        let clearing  = toast.loading("clearing in progress ...")
        try {            
            const options = {
                url:"https://ecommerce.routemisr.com/api/v1/cart",
                method:"DELETE",
                headers:{
                    token
                }
            }
            let {data} = await axios.request(options)
            console.log(data);
            if (data.message==="success") {
                setCartInfo({
                    numOfCartItems:0
                })
                toast.success("cart deleted successfully")
            }
        } catch (error) {
            console.log(error);
        }finally{
            toast.dismiss(clearing)
        }       
    }

    async function updateProductCount({productId,count}) {
        try {
            let options = {
                url:`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                method:"PUT",
                headers:{
                    token
                },
                data:{
                    count
                }
            }
            let{data} = await axios.request(options)

            if (data.status ==="success") {
                setCartInfo(data)                
            }
            console.log(data);
            
        } catch (error) {
            console.log();
            
        }
    }

    return(

    <CartContext.Provider value={{
        addProductToCart,
        getCartProducts,
        cartInfo,
        deleteSpecificItem,
        clearCart,
        updateProductCount

    }} >
         {children}

    </CartContext.Provider>

)
}