import React from "react"
import NotFound from "./NotFound";

import { Navigate } from "react-router-dom"
import { useUserContext } from "../context/userContext"

export default function PublicRoute({children}) {
    const { user } = useUserContext();
    return (user ? null : children);
}