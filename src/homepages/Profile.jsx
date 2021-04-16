import { useEffect } from "react"
import { Redirect } from "react-router"
import axios from 'axios'

const Profile = ({ user }) => {
    useEffect(() => {
        // Example access to the auth-locked route
        async function getUserData() {
            const url = process.env.REACT_APP_SERVER_URL
            const token = localStorage.getItem('jwt')
            // console.log(token)
            const authHeaders = {
                'Authorization': token
            }
            
            const res = await axios.get(`${url}/api-v1/users/bestscore`, { headers: authHeaders })
            const data = res.data
            console.log(data)
        }
        getUserData()
    }, [])

    if(user) {
        return <div>
            <h1>{user.displayName}'s Profile Page!</h1>
            <img src={user.photos[0].value} alt="profile pic"/>
            <p>Logged in from {user.provider}</p>
            {/* <p>User Best Score {user.best_score}</p> */}
        </div>
    } else {
        return <Redirect to="/login" />
    }
}

export default Profile