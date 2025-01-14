
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import Login from './pages/Login/Login.jsx'
import Layout from './components/Layout/Layout.jsx'
import Signup from './pages/Signup/Signup.jsx'
import { Toaster } from 'react-hot-toast'
import ProtectedRoutes from './components/PtotectedRoutes/ProtectedRoutes.jsx'
import GuestRoutes from './components/GuestRputed/GuestRoutes.jsx'
import UserProvider from './context/User.context.jsx'
import CartProvider from './context/Cart.context.jsx'
import Cart from './pages/Cart/Cart.jsx'
import ProductDetails from './pages/ProductDetails/ProductDetails.jsx'
import Checkout from './pages/Checkout/Checkout.jsx'
import Orders from './pages/Orders/Orders.jsx'
import Category from './pages/Category/Category.jsx'
import AllCategories from './pages/allCategories/AllCategories.jsx'
import Brands from './pages/Brans/Brands.jsx'
import Whishlist from './pages/Whishlist/Whishlist.jsx'
import WhishlistProvider from './context/Whishlist.context.jsx'
import ForgetPassword from './pages/ForgetPassword/ForgetPassword.jsx'
import CodeVerification from './pages/CodeVerification/CodeVerification.jsx'
import ResetPassword from './pages/resetPassword/resetPassword.jsx'
import UserProfile from './pages/UserProfile/UserProfile.jsx'
import UpdateUserProfile from './pages/updateUserProfile/UpdateUserProfile.jsx'
import UpdateUserPassword from './pages/updateUserPassword/UpdateUserPassword.jsx'
import Products from './pages/Products/Products.jsx'
import Online from './components/Online/Online.jsx'
import Offline from './components/Offline/Offline.jsx'
import { PiWifiSlashBold } from "react-icons/pi";

const router = createBrowserRouter([
  
  {
  path:"/" , element:
  <ProtectedRoutes>
    <Layout/>
  </ProtectedRoutes>
  ,children:[
    {index:true, element:<Home/>},
    {path:"cart" , element:<Cart/>},
    {path:"product/:id", element:<ProductDetails/>},
    {path:"products", element:<Products/>},
    {path:"checkout",element:<Checkout/>},
    {path:"allorders",element:<Orders/>},
    {path:"categories",element:<AllCategories/>},
    {path:"categories/:id",element:<Category/>},
    {path:"brands",element:<Brands/>},
    {path:"whishlist",element:<Whishlist/>},
    {path:"userProfile",element:<UserProfile/>},
    {path:"updateUserProfile",element:<UpdateUserProfile/>},
    {path:"updateUserPassword",element:<UpdateUserPassword/>},
  ]
},
  {
   path:"/" , element:
   <GuestRoutes>
     <Layout/>
   </GuestRoutes>
   ,children:[
    {path:"/login", element:<Login/>},
    {path:"/signup", element:<Signup/>},
    {path:"/forgetPassword", element:<ForgetPassword/>},
    {path:"/CodeVerification", element:<CodeVerification/>},
    {path:"/resetPassword", element:<ResetPassword/>}
  ]
}

])

function App() {
  return (

    
    <>
    <Online>
      <UserProvider>
        <WhishlistProvider>
          <CartProvider>
            <RouterProvider router={router} />
          </CartProvider>
        </WhishlistProvider>
      </UserProvider>
      <Toaster position='top right' />
    </Online>

    <Offline>
    <div className='min-h-screen w-screen flex justify-center items-center'>
      <div className='bg-slate-400 bg-opacity-40 flex justify-center items-center flex-col rounded-md p-7 w-3/4 space-y-3'>
        <PiWifiSlashBold className='text-red-600 text-3xl' />
          <p className='font-semibold text-2xl'>you are currently offline</p>
          <p className='text-slate-500'>check your connection</p>
      </div>
    </div>
    </Offline>

    </>
  )
}

export default App
