const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middlewares/authMiddleware');

// Inscription
router.post('/register', authController.register);

// Connexion
router.post('/login', authController.login);

// Récupération des infos utilisateur
router.get('/me', authenticateToken, authController.getProfile);

// Mise à jour du profil
router.put('/me', authenticateToken, authController.updateProfile);

module.exports = router;