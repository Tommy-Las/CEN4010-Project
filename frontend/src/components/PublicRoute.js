import { useUserContext } from "../context/userContext"
import { Navigate } from "react-router-dom";

export default function PublicRoute({children}) {
    const { user } = useUserContext();
    return (!user ? children : <></>);
}