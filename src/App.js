import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom"
import { useEffect, useState } from "react"
import Navbar from "./components/Navbar"
import Home from "./homepages/Home"
import Login from "./homepages/Login"
import SaveToken from "./homepages/SaveToken"
import jwt from 'jsonwebtoken'
import NoMatch from "./homepages/NoMatch"
import Profile from "./homepages/Profile"
import Game from "./gamepages/Game"

const App = () => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem('jwt')
        try { 
            if(token) {
                const user = jwt.decode(token)
                setUser(user)
            }
        } catch(err) {
            console.log(err)
            console.log('the token is expired!')
            localStorage.removeItem('jwt')
            setUser(null)
        }
    }, [])

    const handleLogout = () => {
        if(localStorage.getItem('jwt')) {
            localStorage.removeItem('jwt')
            setUser(null)
        }
    }

    return (
        <Router>
            <Navbar user={user} handleLogout={handleLogout} />
            <div className="homepage_container">
                <Switch>
                    <Route exact path="/">
                        <Home user={user}/>
                    </Route>
                    <Route path="/login">
                        <Login user={user} />
                    </Route>
                    <Route path="/saveToken">
                        <SaveToken setUser={setUser} />
                    </Route>
                    <Route path='/profile'>
                        <Profile user={user} />
                    </Route>
                    <Route path='/game'>
                        <Game />
                    </Route>
                    <Route path="*">
                        <NoMatch />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

export default App