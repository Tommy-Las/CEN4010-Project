import React from "react"
import { Navigate } from "react-router-dom"
import { useUserContext } from "../context/userContext"

export default function PrivateRoute({children}) {
    
    const { user } = useUserContext();

    return (user && children);
}