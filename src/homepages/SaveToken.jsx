import { Redirect, useLocation } from "react-router"
import jwt from 'jsonwebtoken'
import { useEffect } from "react"

export default function SaveToken ({ setUser }) {
    const query = new URLSearchParams(useLocation().search)
    const token = query.get('token') 
    
    useEffect(() => {
        localStorage.setItem('jwt', token)
        const user = jwt.decode(token)
        setUser(user)
    }, [setUser, token])

    if(token) {
        return <Redirect to="/" />
    } else {
        return <Redirect to="/login" />
    }
}