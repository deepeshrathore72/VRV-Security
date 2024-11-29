import { useContext, useState , useEffect} from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import './login.css';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {setUserInfo, userInfo} = useContext(UserContext);
    

    async function login(event) {
        event.preventDefault();
        const response = await fetch("http://localhost:8080/login", {
            method: "post",
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });

        if (response.ok) {
            response.json().then( userInfo => {
                setUserInfo(userInfo);
                // localStorage.setItem('userInfo', JSON.stringify(userInfo));
                // setRedirect(true);
                // setRole(userInfo.role);
                // console.log(userInfo);
            });
        }
        else {
            alert('invalid credentials');
        }
    }

    if (userInfo) {
        const role = userInfo.role;
        if (role === 'admin') return <Navigate to="/admin" />;
        if (role === 'editor') return <Navigate to="/editor" />;
        if (role === 'viewer') return <Navigate to="/" />;
    }

    return (
        <form className="login" onSubmit={login}>
            <h1>Login</h1>
            <input type="text" placeholder="username" value={username} onChange={event => setUsername(event.target.value)} required/>
            <input type="password" placeholder="password" value={password} onChange={event => setPassword(event.target.value)} required/>
            <button>Login</button>
        </form>
    );
}