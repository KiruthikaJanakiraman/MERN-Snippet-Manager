import axios from "axios";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";
import domain from "../../util/domain";
import "./Navbar.scss";
function Navbar(){

    const {user, getUser} = useContext(UserContext);

    async function logOut(){
        await axios.get(`${domain}/auth/logOut`);
        await getUser();
    }

    return(
    <div className="navbar">
        <Link to="/"><h1>Snippet Manager</h1></Link>
        {user ===null ? (
            <>
                <Link to="/login">Login</Link><br/>
                <Link to="/register">Register</Link>
            </>) : (user && <button className="btn-logout" onClick={logOut}>Logout</button>)
        }
        
    </div>);
}

export default Navbar;