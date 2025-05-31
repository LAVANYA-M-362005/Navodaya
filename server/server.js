const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ✅ CORS for localhost + Vercel frontend
const allowedOrigins = ['http://localhost:3000', 'https://navodaya-phi.vercel.app'];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // true if using HTTPS in production
}));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error(err));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/student', require('./routes/student'));

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
