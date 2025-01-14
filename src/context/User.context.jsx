import { createContext, useState } from "react";

export const UserContext =  createContext(null)



export default function UserProvider({children}) {
 const [token,setToken] = useState(localStorage.getItem("token"))

 function LogOut (){
    setToken(null)
    localStorage.removeItem("token")

}

 return <UserContext.Provider value={{token,setToken,LogOut}}>
        {children}
    </UserContext.Provider>
}