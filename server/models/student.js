const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    rollNumber: String,
    class: String,
});

module.exports = mongoose.model('student', studentSchema);
