const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Student = require('../models/Student');

// REGISTER (only admin should register students normally)
router.post('/register', async (req, res) => {
    const { name, email, password, rollNumber, class: studentClass } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const student = new Student({
            name,
            email,
            password: hashedPassword,
            rollNumber,
            class: studentClass,
        });
        await student.save();
        res.status(201).json({ message: 'Student registered successfully' });
    } catch (err) {
        res.status(400).json({ error: 'Registration failed. Email might be used.' });
    }
});

// LOGIN
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const student = await Student.findOne({ email });
    if (!student) return res.status(401).json({ error: 'Invalid email' });

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid password' });

    req.session.studentId = student._id;
    res.json({ message: 'Login successful', student });
});

// LOGOUT
router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.clearCookie('connect.sid');
        res.json({ message: 'Logged out' });
    });
});

// CHECK LOGIN STATUS
router.get('/check', (req, res) => {
    if (req.session.studentId) {
        res.json({ loggedIn: true });
    } else {
        res.json({ loggedIn: false });
    }
});

module.exports = router;
