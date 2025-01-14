import { useContext } from "react"
import { CartContext } from "../../context/Cart.context.jsx"
import { Link } from "react-router-dom"

export default function CartItem({cartItemsInfo}) {

    const {count,price,product} = cartItemsInfo
    const {title,category,imageCover,id} = product

    const {deleteSpecificItem,updateProductCount} = useContext(CartContext)

    return (
    <>

    <div className="flex gap-2">
        <div className="card-item grid gap-4 md:gap-2 grid-cols-12 w-full  bg-gray-200 py-3 px-6 rounded-md">
            <img className="col-span-4 w-40 h-40 object-contain md:col-span-2 md:w-36 md:h-36 md:rounded-full overflow-hidden md:object-cover " src={imageCover} alt={title} />
         
          <div className=" col-span-8 md:col-span-10 flex justify-between  flex-col md:flex-row md:justify-between md:items-center  mt-3">
            
            <div className="md:flex justify-around items-center flex-grow">
              <h3 className="md:w-48 lg:w-60 text-slate-600 text-xl font-semibold line-clamp-2">
              <Link to={`/product/${id}`}>
                {title}
              </Link>
              </h3>
              <h4 className="text-slate-600 md:w-48 lg:w-60 text-md line-clamp-2">{category.name}</h4>
            </div>
            
            <div className="flex justify-between items-center flex-grow md:justify-around">
                <div className="icons count flex items-center gap-3">
                    <div onClick={()=>{
                            updateProductCount({productId:id , count: count+1})
                    }} className="plus w-5 h-5 rounded-full flex items-center justify-center cursor-pointer bg-gray-700 text-white">
                    <i class="fa-solid fa-plus"></i>
                    </div>
                    <h2 className="text-lg">{count}</h2>
                    <div onClick={()=>{
                            updateProductCount({productId:id , count: count-1})
                    }}className="minus w-5 h-5 rounded-full flex items-center justify-center cursor-pointer bg-gray-700 text-white">
                    <i class="fa-solid fa-minus"></i>
                    </div>
                </div>

            <h2>{price} L.E</h2>

            </div>
          </div>
        </div>

        <button onClick={()=>{
                    deleteSpecificItem({productId:id})
                }} className="bg-gray-200 hover:bg-gray-300 transition-colors duration-100 outline-none rounded-md flex justify-center items-center p-2 ">
            <i className="fa-solid fa-xmark"></i>
        </button>
    </div>



    {/* <div className="flex gap-2">
        <div className="card-item flex flex-col sm:flex-row items-center justify-between gap-2  bg-gray-200 py-3 px-6 rounded-md flex-grow">
            <img className="w-16 h-16 rounded-full object-cover" src={imageCover} alt={title} />
          <div className="flex justify-between items-center mt-3 w-full">
            <h3 className="text-slate-600 text-lg w-1/4 text-center line-clamp-2">
            <Link to={`/product/${id}`}>
               {title}
            </Link>
            </h3>
            <h4 className="text-slate-600 text-md w-1/6 text-center ">{category.name}</h4>
            <div className="count flex items-center justify-center gap-3">
                <h2 className="text-lg">{count}</h2>
                <div className="icons space-y-2">
                    <div onClick={()=>{
                            updateProductCount({productId:id , count: count+1})
                    }} className="plus w-5 h-5 rounded-full flex items-center justify-center cursor-pointer bg-gray-700 text-white">
                    <i class="fa-solid fa-plus"></i>
                    </div>
                    <div onClick={()=>{
                            updateProductCount({productId:id , count: count-1})
                    }}className="minus w-5 h-5 rounded-full flex items-center justify-center cursor-pointer bg-gray-700 text-white">
                    <i class="fa-solid fa-minus"></i>
                    </div>
                </div>
            </div>

            <h2>{price} L.E</h2>

          </div>


        </div>

        <button onClick={()=>{
                    deleteSpecificItem({productId:id})
                }} className="bg-gray-200 hover:bg-gray-300 transition-colors duration-100 outline-none rounded-md flex justify-center items-center p-2 ">
            <i className="fa-solid fa-xmark"></i>
        </button>
    </div> */}


    </>
  )
}
