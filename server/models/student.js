const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

// ✅ Fix: Check if model already exists
module.exports = mongoose.models.Student || mongoose.model('Student', studentSchema);
