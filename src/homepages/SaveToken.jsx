import { Redirect, useLocation } from "react-router"
import jwt from 'jsonwebtoken'
import { useEffect } from "react"

// The server will redirect to this client endpoint w/ the token in the URL as a query param
// We will grab the token from query, save it in localStorage, then redirect to homepage
const SaveToken = ({ setUser }) => {
    // https://reactrouter.com/web/example/query-parameters
    const query = new URLSearchParams(useLocation().search)
    const token = query.get('token') 
    
    useEffect(() => {
        localStorage.setItem('jwt', token)
        const user = jwt.decode(token)
        // console.log('the token', token)
        // console.log('the user', user)
        setUser(user)
    }, [setUser, token])

    if(token) {
        return <Redirect to="/" />
    } else {
        return <Redirect to="/login" />
    }
}

export default SaveToken