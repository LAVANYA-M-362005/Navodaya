import React, { useState } from 'react';
import '../App.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const res = await fetch('https://navodaya-website.onrender.com/api/auth/Login', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        if (res.ok) {
            alert('Login successful');
            window.location.href = '/dashboard';
        } else {
            alert(data.error);
        }
    };

    return (
        <div className="container">
            <h2>Student Login</h2>
            <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
            <a href="/register">Register</a>
        </div>
    );
}

export default Login;
