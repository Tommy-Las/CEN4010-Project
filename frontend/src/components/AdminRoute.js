
import { Navigate } from "react-router-dom"
import { useUserContext } from "../context/userContext"

export default function AdminRoute({children}) {
    const { user, admin} = useUserContext();

    return ((user && admin) ? children : null);
}