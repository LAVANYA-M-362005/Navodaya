import React, { useEffect, useState } from 'react';
import '../App.css';

function Profile() {
    const [student, setStudent] = useState(null);

    useEffect(() => {
        fetch('https://navodaya-website.onrender.com', {
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => setStudent(data));
    }, []);

    return (
        <div className="container">
            <h2>My Profile</h2>
            {student ? (
                <>
                    <p>Name: {student.name}</p>
                    <p>Email: {student.email}</p>
                    <p>Class: {student.class}</p>
                    <p>Roll Number: {student.rollNumber}</p>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Profile;
