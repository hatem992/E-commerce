import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { UserContext } from "../../context/User.context.jsx"

export default function ProtectedRoutes({children}) {

    let {token} = useContext(UserContext)

    if (token) {
        return children
    }else{
        return <Navigate to="/login" />
    }


}
