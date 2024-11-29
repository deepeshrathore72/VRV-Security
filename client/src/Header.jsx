import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "./UserContext";
import './Header.css';

export default function Header() {
    const {setUserInfo, userInfo} = useContext(UserContext);

    useEffect(() => {
        fetch('http://localhost:8080/profile', {
            credentials: 'include'
        }).then(response => {
            if (response.ok) {
                response.json().then(userInfo => {
                    setUserInfo(userInfo);
                    // console.log(userInfo);
                });
            }
        }).catch(error => {
            console.error("Failed to fetch user profile:", error);
        });
    }, []);

    function logout() {
        fetch('http://localhost:8080/logout', {
            credentials: 'include',
            method: 'POST',
        }).then(() => {
            setUserInfo(null);
            localStorage.removeItem('userInfo'); // Remove user info from localStorage
        }).catch(error => {
            console.error("Logout failed:", error);
        });
    }

    const username = userInfo?.username;

    return (
        <header>
            <Link to="/" className="logo">VRV Security</Link>
            <nav>
                {username ? (
                    <>
                        <span>Hello {username}</span>
                        {/* <Link to="/create">Create new post</Link> */}
                        <a onClick={logout} style={{cursor: 'pointer'}}>Logout</a>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">SignUp</Link>
                    </>
                )}
            </nav>
        </header>
    );
}
