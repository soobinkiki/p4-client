import { Redirect } from 'react-router'
import { 
    GithubLoginButton, 
    GoogleLoginButton,
    FacebookLoginButton
} from 'react-social-login-buttons'

const SERVER_URL = process.env.REACT_APP_SERVER_URL

const handleGoogleClick = async (e) => {
    console.log('Google Clicked!')
    window.location.href = `https://puzzle-2048.herokuapp.com/auth/google`
}

const handleGithubClick = e => {
    console.log('Github Clicked!')
    window.location.href=`https://puzzle-2048.herokuapp.com/auth/github`
}

const handleFacebookClick = e => {
    console.log('Facebook Clicked!')
    window.location.href=`/auth/facebook`
}

const Login = ({ user }) => {
    if(user) {
        return <Redirect to={{ pathname: '/game' }}/>
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
