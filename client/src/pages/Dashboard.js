import React, { useEffect, useState } from 'react';
import './App.css';

function Dashboard() {
    const [student, setStudent] = useState(null);

    useEffect(() => {
        fetch('https://navodaya-website.onrender.com/api/auth/Dashboard', {
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => setStudent(data));
    }, []);

    if (!student) return <p className="container">Loading...</p>;

    return (
        <div className="container">
            <h2>Welcome, {student.name}</h2>
            <p>Class: {student.class}</p>
            <p>Roll No: {student.rollNumber}</p>
            <a href="/profile">View Profile</a>
        </div>
    );
}

export default Dashboard;
