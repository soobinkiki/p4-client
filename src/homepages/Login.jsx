import { Redirect } from 'react-router'
// handy style-only buttons from a 3rd party module
import { 
    GithubLoginButton, 
    GoogleLoginButton,
    FacebookLoginButton
} from 'react-social-login-buttons'

const SERVER_URL = process.env.REACT_APP_SERVER_URL

const handleGoogleClick = async (e) => {
    console.log('Google Clicked!')
    window.location.href = `${SERVER_URL}/auth/google`
}

const handleGithubClick = e => {
    console.log('Github Clicked!')
    window.location.href=`${SERVER_URL}/auth/github`
}

const handleFacebookClick = e => {
    console.log('Facebook Clicked!')
    window.location.href=`${SERVER_URL}/auth/facebook`
}

const Login = ({ user }) => {
    if(user) {
        return <Redirect to={{ pathname: '/' }}/>
    } else {
        return <div id="login_container">
            <h1>Login</h1>
            <GoogleLoginButton onClick={handleGoogleClick} />
            <GithubLoginButton onClick={handleGithubClick} />
            <FacebookLoginButton onClick={handleFacebookClick} />
        </div>
    }
}

export default Login
// import { useState } from 'react'
// import {
//     GoogleLoginButton,
//     GithubLoginButton
// } from 'react-social-login-buttons'

// const SERVER_URL = process.env.REACT_APP_SERVER_URL

// export default function Login () {
    
//     const [user, setUsername] = useState("")
//     const [password, setPassword] = useState("")
//     const [email, setEmail] = useState("")


//     // const handleSubmit = (e) => {
//     //     e.preventDefault()
//     //     userInfo = {
//     //         user: user,
//     //         password: password,
//     //         email: email
//     //     }
//     // }

//     const handleGoogleClick = () => {
//         console.log('Google is clicked');
//         window.location.href = `${SERVER_URL}/auth/google`
//     }
//     const handleGithubClick = () => {
//         console.log('Github is clicked');
//         window.location.href = `${SERVER_URL}/auth/github`

//     }

//     return (
//         <>
//             <form>
//                 <label htmlFor="user_login">Username</label>
//                 <input id="user_login" type="text" placeholder="username" onChange={e => setUsername(e.target.value)}></input>

//                 <label htmlFor="user_password">Password</label>
//                 <input id="user_password" type="password" placeholder="password" onChange={e => setPassword(e.target.value)}></input>

//                 <label htmlFor="user_email">Email</label>
//                 <input id="user_email" type="email" placeholder="email" onChange={e => setEmail(e.target.value)}></input>
                
//                 <input id="userLogin_submit" type="submit" value="Login"></input>
//             </form>

//             <h1>Login</h1>
//             <GoogleLoginButton onClick={handleGoogleClick}/>
//             <GithubLoginButton onClick={handleGithubClick}/>

//         </>
//     )
// }
