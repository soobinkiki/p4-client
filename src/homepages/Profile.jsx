import { useEffect, useState } from "react"
import { Redirect } from "react-router"
import axios from 'axios'

export default function Profile  ({ user })  {
    
    const [userBest, setUserBest] = useState(0)

    useEffect(() => {
        async function getUserData() {
            try {
                const token = localStorage.getItem('jwt')
                const authHeaders = {
                    'authorization': token
                }
                const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/`, { headers: authHeaders })
                const { userInfo } = res.data
                setUserBest(userInfo.best_score);
            } catch(err) {
                console.log(err);
            }
        }
        getUserData()
    }, [])

    if(user) {
        return <>
            <div className="profile_container">
                <div className="userInfo_container_left">
                    <img id="user_profile_pic" src={user.photos[0].value} alt="profile pic"/>
                    <p id="loggedIn_from">Logged in from {user.provider}</p>
                </div>
                <div className="userInfo_container_right">
                    <h1>Hello, {user.name.givenName}</h1>
                    <p>Username: {user.displayName}</p>
                    <p>Your best score: {userBest}</p>
                </div>
            </div>
        </>
    } else {
        return <Redirect to="/login" />
    }
}