import { useEffect, useState } from "react"
import { Redirect } from "react-router"
import axios from 'axios'

const Profile = ({ user }) => {
    
    const [userBest, setUserBest] = useState(0)

    useEffect(() => {
        // Example access to the auth-locked route
        async function getUserData() {
            try {
                const token = localStorage.getItem('jwt')
                // console.log(token)
                const authHeaders = {
                    'authorization': token
                }
                const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/`, { headers: authHeaders })
                console.log(res);
                const { userInfo } = res.data
                setUserBest(userInfo.best_score);
                
                // console.log(data)
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
                    <h1>Hi, {user.displayName}</h1>
                    <p>Best score: {userBest}</p>
                    <p>Game played: 000</p>
                    <p>Reached 2048: 000</p>
                </div>
            </div>
        </>
    } else {
        return <Redirect to="/login" />
    }
}

export default Profile