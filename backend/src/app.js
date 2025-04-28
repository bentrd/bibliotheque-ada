const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const booksRoutes = require('./routes/books');
const adminRoutes = require('./routes/admin');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes principales
app.use('/api/auth', authRoutes);
app.use('/api/books', booksRoutes);
app.use('/api/admin', adminRoutes);

module.exports = app;