import React, { useState } from 'react';
import '../App.css';

function Register() {
    const [form, setForm] = useState({ name: '', email: '', password: '', class: '', rollNumber: '' });

    const handleRegister = async () => {
        const res = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });

        const data = await res.json();
        alert(data.message || data.error);
    };

    return (
        <div className="container">
            <h2>Student Register</h2>
            {['name', 'email', 'password', 'class', 'rollNumber'].map((field) => (
                <input
                    key={field}
                    placeholder={field}
                    type={field === 'password' ? 'password' : 'text'}
                    onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                />
            ))}
            <button onClick={handleRegister}>Register</button>
            <a href="/">Back to Login</a>
        </div>
    );
}

export default Register;
