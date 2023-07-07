import React from 'react';
import { useState } from 'react';
import { loginUser } from '../api';
import { useNavigate } from 'react-router-dom';

const Login = (setToken, token) => {
    console.log(token)
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    
    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("Attempting login");
        try {
            const data = await loginUser(username, password);
            setToken(data.token);
            localStorage.setItem('token', data.token);
            navigate('/routines')
        } catch (err) {
            console.log(err);
        }
    }

    return token ? <h1> You are already logged in!</h1> : <div>
        <form onSubmit={handleLogin}>
            <label>Username: </label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} /><br/>
            <label>Password: </label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br/>
            <button>Login</button>
        </form>
    </div>
}

export default Login;