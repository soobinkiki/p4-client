import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'

export default function Home ({ user }) {
    if(user) {
        return <Redirect to={{ pathname: '/game' }}/>
    } else {
        return (
            <div className="main_container">
                <h1 id="main_title">Ready to win?</h1>
                <p id="main_text">Please login to play the game</p>
                <Link id="login_text" to='/login'><span id="main_login_btn">Login</span></Link>

                <div className="main_howtoplay">
                    <h4 id="main_howtoplay_title">HOW TO PLAY</h4>
                    <p id="main_howtoplay_text">: Use your arrow keys to move the tiles. When two tiles with the same number touch, they merge into one!</p>
                </div>
            </div>
        )
    }
}