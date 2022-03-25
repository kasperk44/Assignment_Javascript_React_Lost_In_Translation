import { NavLink } from "react-router-dom"
import { useUser } from "../../context/UserContext"

const Navbar = () => {

    const {user} = useUser()

    return(
        <nav>
            { user !== null &&
                <NavLink to='/profile' className="navbar">
                    <button className="btn1">
                        {user.username}
                    </button>
                </NavLink>
            }
        </nav>
    )
}

export default Navbar