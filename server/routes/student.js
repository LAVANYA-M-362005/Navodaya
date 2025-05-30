const express = require('express');
const router = express.Router();
const Student = require('../models/student');

// Middleware to check login
function isAuthenticated(req, res, next) {
    if (req.session.studentId) return next();
    return res.status(401).json({ error: 'Not authenticated' });
}

// Get student profile
router.get('/profile', isAuthenticated, async (req, res) => {
    const student = await Student.findById(req.session.studentId).select('-password');
    res.json(student);
});

module.exports = router;
