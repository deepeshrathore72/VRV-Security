import { useState } from "react";
import './register.css';

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function register(event){
        event.preventDefault();
        let response = await fetch('http://localhost:8080/register', {
            method: 'post',
            body: JSON.stringify({username, password}),
            headers: {'Content-Type':'application/json'},
        });
        if (response.status === 200) {
            alert("Registration successful, Now Login to enter");
            setUsername('');
            setPassword('');
        } else {
            alert("Registration failed");
        }
    }

    return (
        <form className="register" onSubmit={register}>
            <h1>SignUp</h1>
            <input type="text" placeholder="username" value={username} onChange={event => setUsername(event.target.value)} required/>
            <input type="password" placeholder="password" value={password} onChange={event => setPassword(event.target.value)} required/>
            <button>SignUp</button>
        </form>
    );
}