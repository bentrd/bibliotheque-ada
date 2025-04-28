// Application Express principale
// Configure les routes principales, le middleware CORS et la gestion des requêtes JSON
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const booksRoutes = require('./routes/books');
const adminRoutes = require('./routes/admin');
require('dotenv').config();
// Chargement des variables d'environnement à partir du fichier .env

const app = express();

app.use(cors());
// Active CORS (Cross-Origin Resource Sharing) pour autoriser les requêtes depuis différents domaines
app.use(express.json());
// Utilise le middleware pour parser les corps de requêtes JSON

// Routes pour l'authentification, la gestion des livres et l'administration
app.use('/api/auth', authRoutes);
app.use('/api/books', booksRoutes);
app.use('/api/admin', adminRoutes);

module.exports = app;