import { Link } from "react-router-dom"

const Navbar = ({ user, handleLogout }) => {
    const loggedIn = (
        <div className="nav_container">
            <li>
                <Link to="/">
                    Play
                </Link>
            </li>
            <li>
                <Link to="/profile">
                    Profile
                </Link>
            </li>
            <li>
                <Link to="/">
                    <span onClick={handleLogout}>Logout</span>
                </Link>
            </li>
        </div>
    )
    const loggedOut = (
        <h1 id="nav_title">2048 Puzzle Game</h1>
    )
    return (
        <nav>
            <ul>
                { user ? loggedIn : loggedOut}
            </ul>
        </nav>
    )
}

export default Navbar